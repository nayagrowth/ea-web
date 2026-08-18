import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

/**
 * Configures a PerspectiveCamera with the exact off-axis asymmetric frustum
 * that makes all (0, 0, -1) longitudinal world lines project precisely to VP = (1433.21, 586.43)
 */
export function configureOffAxisCamera(
  camera: THREE.PerspectiveCamera,
  viewportWidth: number,
  viewportHeight: number
): void {
  const f = REFERENCE_GEOMETRY.frustumAtNear01;
  const refAspect = REFERENCE_GEOMETRY.aspect;
  const currentAspect = viewportWidth / viewportHeight;

  let left = f.left;
  let right = f.right;
  let top = f.top;
  let bottom = f.bottom;

  // Responsive correction preserving exact 1672x941 vertical framing without anisotropic distortion
  if (currentAspect > refAspect) {
    const scaleX = currentAspect / refAspect;
    const midX = (left + right) / 2;
    const halfW = ((right - left) / 2) * scaleX;
    left = midX - halfW;
    right = midX + halfW;
  } else if (currentAspect < refAspect) {
    const scaleY = refAspect / currentAspect;
    const midY = (top + bottom) / 2;
    const halfH = ((top - bottom) / 2) * scaleY;
    top = midY + halfH;
    bottom = midY - halfH;
  }

  camera.projectionMatrix.makePerspective(left, right, top, bottom, f.near, f.far);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}

/**
 * Projects a 3D world line segment into 2D pixel space and returns its line equation (ax + by + c = 0)
 */
export function projectWorldLineToScreen(
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  camera: THREE.Camera,
  width: number,
  height: number
): { p0Px: THREE.Vector2; p1Px: THREE.Vector2; lineEq: THREE.Vector3 } {
  const v0 = p0.clone().project(camera);
  const v1 = p1.clone().project(camera);

  const x0 = ((v0.x + 1) * 0.5) * width;
  const y0 = ((1 - v0.y) * 0.5) * height;
  const x1 = ((v1.x + 1) * 0.5) * width;
  const y1 = ((1 - v1.y) * 0.5) * height;

  // 2D line equation cross product (homogeneous coordinates)
  const l0 = new THREE.Vector3(x0, y0, 1);
  const l1 = new THREE.Vector3(x1, y1, 1);
  const lineEq = l0.cross(l1);

  return {
    p0Px: new THREE.Vector2(x0, y0),
    p1Px: new THREE.Vector2(x1, y1),
    lineEq,
  };
}

/**
 * Computes intersection of two 2D lines in pixel coordinates
 */
export function intersectLines(l1: THREE.Vector3, l2: THREE.Vector3): THREE.Vector2 | null {
  const pt = l1.clone().cross(l2);
  if (Math.abs(pt.z) < 1e-9) return null;
  return new THREE.Vector2(pt.x / pt.z, pt.y / pt.z);
}
