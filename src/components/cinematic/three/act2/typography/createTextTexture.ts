import * as THREE from 'three';
import type { ScreenTextBox } from './typeLayout';

/**
 * Generates an ultra-crisp high-DPI transparent CanvasTexture for spatial typography,
 * with precise text metrics fitting to prevent horizontal clipping and automatic
 * redraw on font load completion.
 */
export function createTextTexture(box: ScreenTextBox): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const dpr = 2.0;

  const boxWidth = box.maxX - box.minX;
  const boxHeight = box.maxY - box.minY;

  const canvasWidth = Math.max(256, Math.round(boxWidth * dpr));
  const canvasHeight = Math.max(128, Math.round(boxHeight * dpr));

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const drawText = () => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dynamic sizing based on measured canvas height
    let fontSize = box.fontSize * (dpr / 2.0) * (canvasHeight / (boxHeight * 1.0));
    ctx.font = `${box.fontStyle} ${box.fontWeight} ${fontSize}px ${box.fontFamily}`;

    if (box.letterSpacing && 'letterSpacing' in ctx) {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = `${box.letterSpacing * dpr}px`;
    }

    // Measure and fit within logical box width
    let measured = ctx.measureText(box.text);
    const maxAllowedWidth = canvasWidth * 0.95;

    if (measured.width > maxAllowedWidth) {
      const scaleFactor = maxAllowedWidth / measured.width;
      fontSize *= scaleFactor;
      ctx.font = `${box.fontStyle} ${box.fontWeight} ${fontSize}px ${box.fontFamily}`;
      measured = ctx.measureText(box.text);
    }

    ctx.fillStyle = box.color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const centerX = canvasWidth * 0.5;
    const centerY = canvasHeight * 0.52;
    ctx.fillText(box.text, centerX, centerY);
  };

  drawText();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  texture.needsUpdate = true;

  // Re-draw and update texture when custom fonts finish loading
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      drawText();
      texture.needsUpdate = true;
    });
  }

  return texture;
}
