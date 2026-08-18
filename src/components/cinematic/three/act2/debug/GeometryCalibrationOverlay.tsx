import React, { useState } from 'react';
import type { CalibrationReport } from './VanishingPointValidator';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

interface GeometryCalibrationOverlayProps {
  report: CalibrationReport | null;
  viewportWidth: number;
  viewportHeight: number;
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
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!report) return null;

  const vpScreenX = REFERENCE_GEOMETRY.vpUv.u * viewportWidth;
  const vpScreenY = REFERENCE_GEOMETRY.vpUv.v * viewportHeight;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-50 overflow-hidden font-mono text-xs">
      {/* Precision Reticle Crosshair at Reference VP */}
      <div
        className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-75 hover:opacity-100 transition-opacity"
        style={{ left: `${vpScreenX}px`, top: `${vpScreenY}px` }}
      >
        <div className="absolute w-full h-[1px] bg-[#F5C200]/70" />
        <div className="absolute h-full w-[1px] bg-[#F5C200]/70" />
        <div className="w-2.5 h-2.5 rounded-full border border-[#F5C200]/80" />
      </div>

      {/* Ultra-Sleek Glass HUD Panel */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 bg-[#050608]/85 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1.5 shadow-2xl text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                report.status === 'PASS' ? 'bg-emerald-400' : 'bg-rose-400'
              }`}
            />
            <span className="font-semibold text-neutral-200">VP HUD</span>
            <span className="text-[10px] text-neutral-400">({report.vpErrorPx.toFixed(2)} px)</span>
          </button>
        ) : (
          <div className="bg-[#050608]/90 backdrop-blur-2xl border border-white/10 rounded-xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-neutral-300 min-w-[260px] max-w-[290px] transition-all">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    report.status === 'PASS' ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <span className="font-semibold text-[11px] text-white tracking-wider">
                  ACT 2 GEOMETRY
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                    report.status === 'PASS'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                  }`}
                >
                  {report.status}
                </span>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-neutral-500 hover:text-white text-[11px] p-0.5 rounded transition-colors cursor-pointer"
                  title="Minimize HUD"
                >
                  −
                </button>
              </div>
            </div>

            <div className="space-y-1 text-[10.5px]">
              <div className="flex justify-between">
                <span className="text-neutral-500">TARGET VP</span>
                <span className="text-[#F5C200] font-medium">
                  {report.targetVP.x.toFixed(1)}, {report.targetVP.y.toFixed(1)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">VP ERROR</span>
                <span className={report.vpErrorPx < 3 ? 'text-emerald-400' : 'text-rose-400'}>
                  {report.vpErrorPx.toFixed(3)} px
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">MAX RAY ERROR</span>
                <span className={report.maxRayErrorPx < 3 ? 'text-emerald-400' : 'text-rose-400'}>
                  {report.maxRayErrorPx.toFixed(3)} px
                </span>
              </div>

              <div className="pt-1.5 mt-1.5 border-t border-white/10 space-y-0.5">
                <span className="text-[9.5px] text-neutral-400 uppercase font-semibold">
                  Silhouettes
                </span>
                {report.silhouettes.map((s) => (
                  <div key={s.name} className="flex justify-between text-[10px]">
                    <span className="text-neutral-500">{readableName(s.name)}</span>
                    <span className={s.status === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}>
                      {s.errorPx.toFixed(2)} px
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 mt-1.5 border-t border-white/10 space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-neutral-500">14 RIGHT RIBS</span>
                  <span className={report.rightRibStatus === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}>
                    {report.rightRibStatus}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-1.5 border-t border-white/5 text-[9.5px] text-neutral-500">
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
