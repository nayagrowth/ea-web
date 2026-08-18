import React from 'react';
import type { CalibrationReport } from './VanishingPointValidator';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

interface GeometryCalibrationOverlayProps {
  report: CalibrationReport | null;
  viewportWidth: number;
  viewportHeight: number;
}

export const GeometryCalibrationOverlay: React.FC<GeometryCalibrationOverlayProps> = ({
  report,
  viewportWidth,
  viewportHeight,
}) => {
  if (!report) return null;

  const vpScreenX = (REFERENCE_GEOMETRY.vpPx.x / REFERENCE_GEOMETRY.width) * viewportWidth;
  const vpScreenY = (REFERENCE_GEOMETRY.vpPx.y / REFERENCE_GEOMETRY.height) * viewportHeight;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-50 overflow-hidden font-mono text-xs">
      {/* Target Vanishing Point Crosshair */}
      <div
        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ left: `${vpScreenX}px`, top: `${vpScreenY}px` }}
      >
        <div className="absolute w-full h-[1px] bg-amber-400 opacity-80" />
        <div className="absolute h-full w-[1px] bg-amber-400 opacity-80" />
        <div className="w-3 h-3 rounded-full border border-amber-400 opacity-80" />
      </div>

      {/* Real-Time Calibration Status HUD */}
      <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md border border-neutral-800 rounded-lg p-3.5 shadow-2xl text-neutral-300 min-w-[280px]">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
          <span className="font-semibold text-white tracking-wide">ACT 2 CALIBRATION</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              report.status === 'PASS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}
          >
            {report.status} ({report.maxErrorPx.toFixed(2)} px)
          </span>
        </div>

        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between">
            <span className="text-neutral-500">TARGET VP</span>
            <span className="text-amber-400 font-medium">
              {report.targetVP.x.toFixed(2)}, {report.targetVP.y.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">PROJECTED VP</span>
            <span className="text-neutral-200">
              {report.projectedVP.x.toFixed(2)}, {report.projectedVP.y.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">MAX RAY ERROR</span>
            <span className={report.maxErrorPx < 3.0 ? 'text-emerald-400' : 'text-rose-400'}>
              {report.maxErrorPx.toFixed(3)} px
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">AVG RAY ERROR</span>
            <span className="text-neutral-200">{report.avgErrorPx.toFixed(3)} px</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-neutral-800/60 text-[10px] text-neutral-500">
            <span>RAYS: {report.lineCount}</span>
            <span>INTERSECTIONS: {report.intersectionCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
