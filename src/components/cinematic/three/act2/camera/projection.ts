import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

/**
 * Configures a PerspectiveCamera from calibrated pinhole intrinsics.
 *
 * Important responsive rule:
 * - preserve the reference vertical photographic scale,
 * - preserve the measured VP at the same normalized screen coordinate,
 * - widen/crop horizontally naturally with viewport aspect ratio,
 * - never anisotropically stretch the reference frustum.
 */
export function configureOffAxisCamera(
  camera: THREE.PerspectiveCamera,
  viewportWidth: number,
  viewportHeight: number
): void {
  const ref = REFERENCE_GEOMETRY;
  const near = ref.frustumAtNear01.near;
  const far = ref.frustumAtNear01.far;

  // Scale focal length from reference pixels by viewport height.
  // Square-pixel camera: fx and fy scale together.
  const scale = viewportHeight / ref.height;
  const fx = ref.camera.fx * scale;
  const fy = ref.camera.fy * scale;

  // Preserve the measured VP/principal point in normalized viewport coordinates.
  const cx = ref.vpUv.u * viewportWidth;
  const cy = ref.vpUv.v * viewportHeight;

  // Pixel intrinsics -> asymmetric near-plane frustum.
  const left = -(cx / fx) * near;
  const right = ((viewportWidth - cx) / fx) * near;
  const top = (cy / fy) * near;
  const bottom = -((viewportHeight - cy) / fy) * near;

  camera.aspect = viewportWidth / viewportHeight;
  camera.near = near;
  camera.far = far;
  camera.projectionMatrix.makePerspective(left, right, top, bottom, near, far);
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}

/**
 * Projects a 3D world line segment into 2D pixel space and returns its
 * screen endpoints and homogeneous line equation ax + by + c = 0.
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

  const l0 = new THREE.Vector3(x0, y0, 1);
  const l1 = new THREE.Vector3(x1, y1, 1);
  const lineEq = l0.cross(l1);

  return {
    p0Px: new THREE.Vector2(x0, y0),
    p1Px: new THREE.Vector2(x1, y1),
    lineEq,
  };
}

export function intersectLines(l1: THREE.Vector3, l2: THREE.Vector3): THREE.Vector2 | null {
  const pt = l1.clone().cross(l2);
  if (Math.abs(pt.z) < 1e-9) return null;
  return new THREE.Vector2(pt.x / pt.z, pt.y / pt.z);
}
