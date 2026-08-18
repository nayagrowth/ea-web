import * as THREE from 'three';
import type { WallTextQuadGeometryData } from './typeLayout';
import { createTextTexture } from './createTextTexture';

export class WallTextQuad {
  public mesh: THREE.Mesh;
  public data: WallTextQuadGeometryData;
  public material: THREE.MeshBasicMaterial;
  public texture: THREE.CanvasTexture;

  private geometry: THREE.BufferGeometry;

  constructor(data: WallTextQuadGeometryData) {
    this.data = data;

    // 1. Centered Local Quad Geometry (P_local = P_world - Centroid)
    const positions = new Float32Array([
      data.localTL.x, data.localTL.y, data.localTL.z, // 0: TL
      data.localTR.x, data.localTR.y, data.localTR.z, // 1: TR
      data.localBR.x, data.localBR.y, data.localBR.z, // 2: BR
      data.localBL.x, data.localBL.y, data.localBL.z, // 3: BL
    ]);

    const uvs = new Float32Array([
      0.0, 1.0, // TL
      1.0, 1.0, // TR
      1.0, 0.0, // BR
      0.0, 0.0, // BL
    ]);

    const indices = [
      0, 3, 1,
      1, 3, 2,
    ];

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.geometry.setIndex(indices);
    this.geometry.computeVertexNormals();

    // 2. High-DPI Texture & Material
    this.texture = createTextTexture(data.screenBox);

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      opacity: data.screenBox.opacity,
      depthWrite: false,
      depthTest: true,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = `Act2_Text_${data.name}`;
    this.mesh.position.copy(data.centroid);
    this.mesh.userData = {
      act2Role: 'spatial-typography',
      phrase: data.name,
      text: data.text,
      centroid: data.centroid,
    };
  }

  /**
   * Sets opacity and animated local spatial transform offset around the word's own centroid.
   */
  public setSpatialState(
    opacity: number,
    localOffset: THREE.Vector3,
    rotDeg = 0,
    scale = 1.0
  ): void {
    this.material.opacity = Math.max(0, Math.min(1, opacity));
    this.mesh.position.set(
      this.data.centroid.x + localOffset.x,
      this.data.centroid.y + localOffset.y,
      this.data.centroid.z + localOffset.z
    );
    this.mesh.rotation.z = THREE.MathUtils.degToRad(rotDeg);
    this.mesh.scale.setScalar(scale);
    this.mesh.visible = this.material.opacity > 0.001;
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
  }
}
