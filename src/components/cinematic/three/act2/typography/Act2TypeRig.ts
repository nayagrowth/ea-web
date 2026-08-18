import * as THREE from 'three';
import { getAct2TextQuadData } from './typeLayout';
import { WallTextQuad } from './WallTextQuad';

export interface Act2TypeRig {
  group: THREE.Group;
  quads: Record<string, WallTextQuad>;
  disposables: Array<{ dispose: () => void }>;
}

/**
 * Creates the Act 2 Spatial Typography Rig containing the 5 discrete
 * 3D word quads unprojected from canonical reference screen rays.
 */
export function createAct2TypeRig(): Act2TypeRig {
  const group = new THREE.Group();
  group.name = 'Act2_SpatialTypographyRig';

  const quadDataList = getAct2TextQuadData();
  const quads: Record<string, WallTextQuad> = {};
  const disposables: Array<{ dispose: () => void }> = [];

  quadDataList.forEach((data) => {
    const quad = new WallTextQuad(data);
    quads[data.name] = quad;
    group.add(quad.mesh);
    disposables.push(quad);
  });

  return {
    group,
    quads,
    disposables,
  };
}
