import React, { useState } from 'react';
import type { CalibrationReport } from './VanishingPointValidator';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

interface GeometryCalibrationOverlayProps {
  report: CalibrationReport | null;
  viewportWidth: number;
  viewportHeight: number;
  isWireframe?: boolean;
  onToggleWireframe?: () => void;
  isClayMode?: boolean;
  onToggleClayMode?: () => void;
  viewportMode?: 'presentation' | 'calibration';
  onToggleViewportMode?: () => void;
  onForceCalibrationMode?: () => void;
}

function readableName(name: string): string {
  switch (name) {
    case 'TopSilverBlade':
      return 'TOP BLADE';
    case 'MainGoldHorizon':
      return 'GOLD HORIZON';
    case 'UpperGoldDepthRail':
      return 'UPPER GOLD RAIL';
    default:
      return name;
  }
}

export const GeometryCalibrationOverlay: React.FC<GeometryCalibrationOverlayProps> = ({
  report,
  viewportWidth,
  viewportHeight,
  isWireframe = false,
  onToggleWireframe,
  isClayMode = false,
  onToggleClayMode,
  viewportMode = 'presentation',
  onToggleViewportMode,
  onForceCalibrationMode,
}) => {
  // Default to minimized pill so the right louver wall is never obscured
  const [isMinimized, setIsMinimized] = useState(true);
  const [showReferenceOverlay, setShowReferenceOverlay] = useState(false);
  const [referenceOpacity, setReferenceOpacity] = useState(0.5);
  const [isDifferenceMode, setIsDifferenceMode] = useState(false);

  if (!report) return null;

  const vpScreenX = REFERENCE_GEOMETRY.vpUv.u * viewportWidth;
  const vpScreenY = REFERENCE_GEOMETRY.vpUv.v * viewportHeight;

  const handleToggleReference = () => {
    const nextState = !showReferenceOverlay;
    setShowReferenceOverlay(nextState);
    if (nextState && onForceCalibrationMode) {
      onForceCalibrationMode();
    }
  };

  const handleToggleDifferenceMode = () => {
    setIsDifferenceMode((prev) => !prev);
    if (onForceCalibrationMode) {
      onForceCalibrationMode();
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-50 overflow-hidden font-mono text-xs">
      {/* Precision Reticle Crosshair at Canonical Reference VP */}
      <div
        className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-85 hover:opacity-100 transition-opacity"
        style={{ left: `${vpScreenX}px`, top: `${vpScreenY}px` }}
      >
        <div className="absolute w-full h-[1px] bg-[#F5C200]/80" />
        <div className="absolute h-full w-[1px] bg-[#F5C200]/80" />
        <div className="w-2.5 h-2.5 rounded-full border border-[#F5C200]/90 shadow-[0_0_8px_#F5C200]" />
      </div>

      {/* Reference Comparison Overlay (Screen-Contained 1:1 Pixel Match) */}
      {showReferenceOverlay && (
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDifferenceMode ? 'mix-blend-difference' : 'mix-blend-screen'
          }`}
          style={{ opacity: referenceOpacity }}
        >
          <img
            src="/reference_act2.png"
            alt="Reference Act 2 Alignment"
            className="w-full h-full object-fill"
          />
        </div>
      )}

      {/* Ultra-Sleek Glass HUD Panel (Positioned on Left to Keep Right Louvers 100% Unobscured) */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 bg-[#050608]/90 backdrop-blur-xl border border-white/12 rounded-full px-3.5 py-1.5 shadow-2xl text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer hover:border-[#F5C200]/40"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                report.status === 'PASS' ? 'bg-emerald-400' : 'bg-rose-400'
              }`}
            />
            <span className="font-semibold text-neutral-200 font-qurova">ACT 2 CALIBRATION</span>
            <span className="text-[10px] text-neutral-400">
              ({viewportMode === 'presentation' ? 'Cover' : 'Contain'})
            </span>
          </button>
        ) : (
          <div className="bg-[#050608]/95 backdrop-blur-2xl border border-white/12 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-neutral-300 min-w-[290px] max-w-[320px] transition-all">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    report.status === 'PASS' ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <span className="font-bold text-[11.5px] text-white tracking-wider font-qurova">
                  ACT 2 GEOMETRY LOCK
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                    report.status === 'PASS'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                  }`}
                >
                  {report.status}
                </span>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-neutral-500 hover:text-white text-[12px] px-1 rounded transition-colors cursor-pointer"
                  title="Minimize HUD"
                >
                  −
                </button>
              </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-neutral-500">STAGE MODE</span>
                <span className="text-white font-semibold uppercase">{viewportMode}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">TARGET VP</span>
                <span className="text-[#F5C200] font-semibold">
                  {report.targetVP.x.toFixed(1)}, {report.targetVP.y.toFixed(1)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">VP ERROR</span>
                <span className={report.vpErrorPx < 2 ? 'text-emerald-400 font-semibold' : 'text-rose-400'}>
                  {report.vpErrorPx.toFixed(3)} px
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">MAX RAY ERROR</span>
                <span className={report.maxRayErrorPx < 3 ? 'text-emerald-400' : 'text-rose-400'}>
                  {report.maxRayErrorPx.toFixed(3)} px
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">TOP BLADE ENTRY (Y=0)</span>
                <span className={report.topBladeEntryErrorPx < 3 ? 'text-emerald-400' : 'text-rose-400'}>
                  {report.topBladeEntryErrorPx.toFixed(3)} px
                </span>
              </div>

              {/* Primary Silhouettes */}
              <div className="pt-1.5 mt-1.5 border-t border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">
                  Silhouettes
                </span>
                {report.silhouettes.map((s) => (
                  <div key={s.name} className="flex justify-between text-[10.5px]">
                    <span className="text-neutral-500">{readableName(s.name)}</span>
                    <span className={s.status === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}>
                      {s.errorPx.toFixed(2)} px ({s.status})
                    </span>
                  </div>
                ))}
              </div>

              {/* 14 Right Louver Slabs */}
              <div className="pt-1.5 mt-1.5 border-t border-white/10 space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">14 RIGHT LOUVER SLABS</span>
                  <span className={report.rightRibStatus === 'PASS' ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                    {report.rightRibStatus}
                  </span>
                </div>
                <div className="flex justify-between text-[10.5px]">
                  <span className="text-neutral-600">SLAB OCCUPANCY</span>
                  <span className={report.slatOccupancyStatus === 'PASS' ? 'text-emerald-400' : 'text-neutral-400'}>
                    65% BODY / 35% CAVITY ({report.slatOccupancyStatus})
                  </span>
                </div>
              </div>

              {/* Floor Sweep Curve Reprojection */}
              <div className="pt-1.5 mt-1.5 border-t border-white/10 space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">FLOOR SWEEP CURVES</span>
                  <span className={report.floorCurveStatus === 'PASS' ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                    {report.floorCurveStatus}
                  </span>
                </div>
                {report.floorCurves.map((c) => (
                  <div key={c.name} className="flex justify-between text-[10px]">
                    <span className="text-neutral-600">{c.name.replace('FloorSweep_', '')}</span>
                    <span className="text-emerald-400">
                      avg {c.avgErrorPx.toFixed(3)} px / max {c.maxErrorPx.toFixed(3)} px
                    </span>
                  </div>
                ))}
              </div>

              {/* Dev Inspection Tools */}
              <div className="pt-2 mt-2 border-t border-white/10 space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">
                  Dev Inspection Suite
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {onToggleViewportMode && (
                    <button
                      onClick={onToggleViewportMode}
                      className={`px-2 py-1 rounded text-[10.5px] font-semibold transition-all cursor-pointer ${
                        viewportMode === 'calibration'
                          ? 'bg-[#F5C200] text-[#001A24]'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/15'
                      }`}
                      title="Toggle Contain (Calibration) vs Cover (Presentation)"
                    >
                      {viewportMode === 'calibration' ? 'Mode: Contain' : 'Mode: Cover'}
                    </button>
                  )}
                  {onToggleWireframe && (
                    <button
                      onClick={onToggleWireframe}
                      className={`px-2 py-1 rounded text-[10.5px] font-semibold transition-all cursor-pointer ${
                        isWireframe
                          ? 'bg-[#F5C200] text-[#001A24]'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/15'
                      }`}
                    >
                      {isWireframe ? 'Wireframe: ON' : 'Wireframe'}
                    </button>
                  )}
                  {onToggleClayMode && (
                    <button
                      onClick={onToggleClayMode}
                      className={`px-2 py-1 rounded text-[10.5px] font-semibold transition-all cursor-pointer ${
                        isClayMode
                          ? 'bg-[#F5C200] text-[#001A24]'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/15'
                      }`}
                    >
                      {isClayMode ? 'Clay: ON' : 'Clay'}
                    </button>
                  )}
                  <button
                    onClick={handleToggleReference}
                    className={`px-2 py-1 rounded text-[10.5px] font-semibold transition-all cursor-pointer ${
                      showReferenceOverlay
                        ? 'bg-[#F5C200] text-[#001A24]'
                        : 'bg-white/10 text-neutral-300 hover:bg-white/15'
                    }`}
                  >
                    {showReferenceOverlay ? 'Ref: ON' : 'Ref Overlay'}
                  </button>
                </div>

                {showReferenceOverlay && (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={handleToggleDifferenceMode}
                      className="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                    >
                      Mode: {isDifferenceMode ? 'Difference' : 'Screen'}
                    </button>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={referenceOpacity}
                      onChange={(e) => setReferenceOpacity(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-white/20 rounded cursor-pointer accent-[#F5C200]"
                    />
                  </div>
                )}
              </div>

              {/* RAYS & INTERSECTIONS */}
              <div className="flex justify-between pt-2 border-t border-white/5 text-[10px] text-neutral-500">
                <span>RAYS: {report.lineCount}</span>
                <span>INTERSECTIONS: {report.intersectionCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
