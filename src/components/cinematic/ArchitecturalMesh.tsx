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

    const COLS = 24;
    const ROWS = 16;

    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const fov = 420;
      // Positioned firmly in the Right-Centered Quadrant
      const cx = width * 0.74;
      const cy = height * 0.50;

      // 3D Isometric Pitch and Yaw Angles
      const rotX = 1.12;
      const rotZ = -0.32;

      const points: { x: number; y: number; z: number; px: number; py: number; alpha: number }[][] = [];

      for (let r = 0; r < ROWS; r++) {
        points[r] = [];
        for (let c = 0; c < COLS; c++) {
          const x0 = (c - COLS / 2) * 32;
          const y0 = (r - ROWS / 2) * 32;

          const dist = Math.sqrt(x0 * x0 + y0 * y0);
          // Elevation reacts dynamically to scroll progress + continuous time wave
          const z0 =
            Math.sin(dist * 0.04 - time + progress * 4) * (24 + progress * 15) +
            Math.cos(x0 * 0.05 + time) * 16 +
            (1 - r / ROWS) * 38;

          // 3D rotation transform
          const x1 = x0 * Math.cos(rotZ) - y0 * Math.sin(rotZ);
          const y1 = x0 * Math.sin(rotZ) + y0 * Math.cos(rotZ);
          const z1 = z0;

          const x2 = x1;
          const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
          const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX) + 420;

          const scale = fov / (fov + z2);
          const px = cx + x2 * scale;
          const py = cy + y2 * scale;
          const alpha = Math.max(0.08, Math.min(0.85, (z2 - 100) / 450));

          points[r][c] = { x: x2, y: y2, z: z2, px, py, alpha };
        }
      }

      // Draw Rows (Champagne Gold wireframe)
      ctx.lineWidth = 1.2;
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const pt = points[r][c];
          if (c === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, 'rgba(245, 184, 0, 0.0)');
        grad.addColorStop(0.5, `rgba(245, 184, 0, ${0.45 * (1 - r / ROWS)})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.12)');
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
        grad.addColorStop(0, 'rgba(245, 184, 0, 0.5)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      // Draw Glowing Nodal Vertices
      const scanCol = Math.floor(((time * 3.5) % COLS));

      for (let r = 0; r < ROWS; r += 2) {
        for (let c = 0; c < COLS; c += 2) {
          const pt = points[r][c];
          const isScanning = c === scanCol || c === scanCol + 1;

          ctx.beginPath();
          ctx.arc(pt.px, pt.py, isScanning ? 3.4 : 1.8, 0, Math.PI * 2);
          ctx.fillStyle = isScanning ? '#FFFFFF' : '#F5B800';
          ctx.shadowColor = '#F5B800';
          ctx.shadowBlur = isScanning ? 14 : 3;
          ctx.fill();
          ctx.shadowBlur = 0;
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
    <div className={`relative w-full h-full pointer-events-none select-none ${className}`}>
      {/* Real-time 3D Wireframe Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
