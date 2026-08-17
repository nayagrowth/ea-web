import React, { useEffect, useRef } from 'react';

interface ArchitecturalMeshProps {
  className?: string;
  progress?: number;
}

export const ArchitecturalMesh: React.FC<ArchitecturalMeshProps> = ({
  className = '',
  progress = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const COLS = 22;
    const ROWS = 16;

    const render = () => {
      time += 0.025;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const fov = 350;
      const cx = width * 0.52;
      const cy = height * 0.58;

      // Camera 3D pitch/yaw angles
      const rotX = 1.15; // looking down onto the 3D grid
      const rotZ = -0.35; // isometric angle

      const points: { x: number; y: number; z: number; px: number; py: number; alpha: number }[][] = [];

      for (let r = 0; r < ROWS; r++) {
        points[r] = [];
        for (let c = 0; c < COLS; c++) {
          // Normalize coordinates centered at 0
          const x0 = (c - COLS / 2) * 28;
          const y0 = (r - ROWS / 2) * 28;

          // Wave elevation math
          const dist = Math.sqrt(x0 * x0 + y0 * y0);
          const z0 =
            Math.sin(dist * 0.04 - time + progress * 4) * 26 +
            Math.cos(x0 * 0.05 + time) * 14 +
            (1 - r / ROWS) * 35; // elevation slope

          // 3D rotation transform
          // Rotate Z
          const x1 = x0 * Math.cos(rotZ) - y0 * Math.sin(rotZ);
          const y1 = x0 * Math.sin(rotZ) + y0 * Math.cos(rotZ);
          const z1 = z0;

          // Rotate X
          const x2 = x1;
          const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
          const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX) + 380; // camera distance

          // Perspective projection
          const scale = fov / (fov + z2);
          const px = cx + x2 * scale;
          const py = cy + y2 * scale;
          const alpha = Math.max(0.1, Math.min(0.9, (z2 - 100) / 400));

          points[r][c] = { x: x2, y: y2, z: z2, px, py, alpha };
        }
      }

      // Draw Grid Lines (Horizontal & Vertical wireframes)
      ctx.lineWidth = 1.2;

      // Draw Rows
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const pt = points[r][c];
          if (c === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, 'rgba(245, 184, 0, 0.05)');
        grad.addColorStop(0.5, `rgba(245, 184, 0, ${0.45 * (1 - r / ROWS)})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      // Draw Columns
      for (let c = 0; c < COLS; c++) {
        ctx.beginPath();
        for (let r = 0; r < ROWS; r++) {
          const pt = points[r][c];
          if (r === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, 'rgba(245, 184, 0, 0.4)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      // Draw Glowing Nodal Vertices & Laser Scan Line
      const scanCol = Math.floor(((time * 4) % COLS));

      for (let r = 0; r < ROWS; r += 2) {
        for (let c = 0; c < COLS; c += 2) {
          const pt = points[r][c];
          const isScanning = c === scanCol || c === scanCol + 1;

          ctx.beginPath();
          ctx.arc(pt.px, pt.py, isScanning ? 3.5 : 1.8, 0, Math.PI * 2);
          ctx.fillStyle = isScanning ? '#FFFFFF' : '#F5B800';
          ctx.shadowColor = '#F5B800';
          ctx.shadowBlur = isScanning ? 12 : 4;
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Ambient Radial Mesh Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Real-time 3D Wireframe Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* High-Tech Architectural Telemetry Badges */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1 font-mono text-[10px] text-gray-400 select-none pointer-events-none">
        <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] animate-ping" />
          <span className="text-[#F5B800] font-bold">TIMELINE MATRIX: 100% DISCIPLINE</span>
        </div>
        <span className="text-gray-500 tracking-wider">TOPOGRAPHY ELEVATION MODEL &bull; 90-DAY VECTOR</span>
      </div>

      {/* Floating Mandate Velocity Badge on Mesh */}
      <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-black/75 border border-[#F5B800]/40 px-4 py-2 rounded-2xl backdrop-blur-md shadow-2xl select-none pointer-events-none">
        <div className="flex flex-col text-right">
          <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Mandate Velocity</span>
          <span className="text-xs font-bold text-white">Absorption Accelerated</span>
        </div>
        <span className="text-base font-black text-[#F5B800] bg-[#F5B800]/15 px-2.5 py-1 rounded-lg border border-[#F5B800]/40 shadow-[0_0_15px_rgba(245,184,0,0.3)]">
          +4.2x
        </span>
      </div>
    </div>
  );
};
