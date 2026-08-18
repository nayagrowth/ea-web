import * as THREE from 'three';
import type { ScreenTextBox } from './typeLayout';

/**
 * Generates an ultra-crisp high-DPI transparent CanvasTexture for spatial typography.
 */
export function createTextTexture(box: ScreenTextBox): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const dpr = 2.0;

  const width = Math.max(128, (box.maxX - box.minX) * dpr);
  const height = Math.max(64, (box.maxY - box.minY) * dpr);

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.clearRect(0, 0, width, height);

  // Configure high-fidelity typography
  const fontSize = box.fontSize * (dpr / 2.0) * (height / ((box.maxY - box.minY) * 1.0));
  ctx.font = `${box.fontStyle} ${box.fontWeight} ${fontSize}px ${box.fontFamily}`;
  ctx.fillStyle = box.color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';

  // Letter spacing if supported
  if (box.letterSpacing && 'letterSpacing' in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = `${box.letterSpacing * dpr}px`;
  }

  // Draw crisp text centered vertically
  const paddingX = 16 * dpr;
  const centerY = height * 0.52;
  ctx.fillText(box.text, paddingX, centerY);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  texture.needsUpdate = true;

  return texture;
}
