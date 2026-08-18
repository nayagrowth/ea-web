import * as THREE from 'three';
import type { WallTextQuadGeometryData } from './typeLayout';
import { createTextTexture } from './createTextTexture';

export class WallTextQuad {
  public mesh: THREE.Mesh;
  public data: WallTextQuadGeometryData;
  public basePositions: Float32Array;
  public material: THREE.MeshBasicMaterial;
  public texture: THREE.CanvasTexture;

  private geometry: THREE.BufferGeometry;

  constructor(data: WallTextQuadGeometryData) {
    this.data = data;

    // 1. Quad Vertex Positions (TL, TR, BR, BL)
    // 2 Triangles: (0, 3, 1) and (1, 3, 2)
    const positions = new Float32Array([
      data.pTL.x, data.pTL.y, data.pTL.z, // 0: TL
      data.pTR.x, data.pTR.y, data.pTR.z, // 1: TR
      data.pBR.x, data.pBR.y, data.pBR.z, // 2: BR
      data.pBL.x, data.pBL.y, data.pBL.z, // 3: BL
    ]);
    this.basePositions = new Float32Array(positions);

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

    // 2. Texture & Material
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
    this.mesh.userData = {
      act2Role: 'spatial-typography',
      phrase: data.name,
      text: data.text,
    };
  }

  /**
   * Sets opacity and animated spatial transform offset for this word quad.
   */
  public setSpatialState(
    opacity: number,
    posOffset: THREE.Vector3,
    rotX = 0,
    scale = 1.0
  ): void {
    this.material.opacity = Math.max(0, Math.min(1, opacity));
    this.mesh.position.copy(posOffset);
    this.mesh.rotation.x = rotX;
    this.mesh.scale.setScalar(scale);
    this.mesh.visible = this.material.opacity > 0.001;
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
  }
}
