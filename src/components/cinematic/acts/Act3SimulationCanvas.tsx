import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  speed: number;
  length: number;
}

export const Act3SimulationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 85;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 1000 + 50,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 3.0 + 1.5,
        length: Math.random() * 20 + 6,
      });
    }

    const centerX = width * 0.5;
    const centerY = height * 0.5;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z -= p.speed;

        if (p.z <= 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.8;
          p.y = (Math.random() - 0.5) * height * 1.8;
        }

        const k = 380 / p.z;
        const px = centerX + p.x * k;
        const py = centerY + p.y * k;

        const prevZ = p.z + p.length;
        const prevK = 380 / prevZ;
        const prevX = centerX + p.x * prevK;
        const prevY = centerY + p.y * prevK;

        if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
          const depthAlpha = Math.min(1, Math.max(0, (1000 - p.z) / 800)) * p.alpha;
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `rgba(245, 194, 0, ${depthAlpha * 0.35})`;
          ctx.lineWidth = Math.max(0.6, p.size * k * 0.5);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.8, p.size * k * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 242, 204, ${depthAlpha * 0.8})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="act3-sim-canvas absolute inset-0 w-full h-full pointer-events-none z-0 opacity-45"
    />
  );
};
