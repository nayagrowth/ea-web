import * as THREE from 'three';

export interface ResizeResult {
  cssWidth: number;
  cssHeight: number;
  bufferWidth: number;
  bufferHeight: number;
  dpr: number;
}

/**
 * Recommended renderer sizing for calibrated stages.
 *
 * Camera/projection math receives CSS/logical dimensions.
 * Drawing buffer receives capped DPR dimensions.
 * CSS display size is explicit and independent from buffer resolution.
 */
export function resizeCalibratedRenderer(
  renderer: THREE.WebGLRenderer,
  container: HTMLElement,
  configureCamera: (cssWidth: number, cssHeight: number) => void,
  maxDpr = 1.75,
  maxPixelCount = 3840 * 2160
): ResizeResult {
  const cssWidth = Math.max(1, Math.round(container.clientWidth));
  const cssHeight = Math.max(1, Math.round(container.clientHeight));

  const requestedDpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  let bufferWidth = Math.floor(cssWidth * requestedDpr);
  let bufferHeight = Math.floor(cssHeight * requestedDpr);

  const pixelCount = bufferWidth * bufferHeight;
  const capScale =
    pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount / pixelCount) : 1;

  bufferWidth = Math.max(1, Math.floor(bufferWidth * capScale));
  bufferHeight = Math.max(1, Math.floor(bufferHeight * capScale));
  const effectiveDpr = bufferWidth / cssWidth;

  // Avoid hidden setPixelRatio multiplication. We own the buffer explicitly.
  renderer.setPixelRatio(1);
  renderer.setSize(bufferWidth, bufferHeight, false);

  const canvas = renderer.domElement;
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';

  configureCamera(cssWidth, cssHeight);

  return {
    cssWidth,
    cssHeight,
    bufferWidth,
    bufferHeight,
    dpr: effectiveDpr,
  };
}
