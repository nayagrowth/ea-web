import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Act2TrueRendererProps {
  progress?: number;
  className?: string;
}

interface TypographyConfig {
  id: string;
  text: string;
  font: string;
  color: string;
  isGold?: boolean;
  letterSpacing?: string;
  pixelLeft: number;
  pixelTop: number;
  pixelWidth: number;
  depthZ: number;
  yawOffset?: number;
  pitchOffset?: number;
  rollOffset?: number;
}

/**
 * Creates high-resolution 4K canvas texture with exact font rendering, drop shadow, and crisp anti-aliasing
 */
function createCrispTextTexture(
  text: string,
  font: string,
  color: string,
  isGold: boolean = false,
  letterSpacing: string = '0px',
  hasShadow: boolean = true
): { texture: THREE.CanvasTexture; aspect: number } {
  const offscreen = document.createElement('canvas');
  const ctx = offscreen.getContext('2d', { willReadFrequently: true })!;

  // 4x supersampling base font size for razor-sharp rendering in 3D perspective
  const baseFontSize = 280;
  ctx.font = font.replace(/__SIZE__/g, `${baseFontSize}px`);
  try {
    (ctx as unknown as { letterSpacing?: string }).letterSpacing = letterSpacing;
  } catch {
    // fallback if unsupported
  }
  const metrics = ctx.measureText(text);

  const textWidth = Math.ceil(metrics.width);
  const actualAscent = Math.ceil(metrics.actualBoundingBoxAscent || baseFontSize * 0.85);
  const actualDescent = Math.ceil(metrics.actualBoundingBoxDescent || baseFontSize * 0.3);
  const textHeight = actualAscent + actualDescent;

  const padX = 64;
  const padY = 64;
  const canvasWidth = THREE.MathUtils.ceilPowerOfTwo(textWidth + padX * 2);
  const canvasHeight = THREE.MathUtils.ceilPowerOfTwo(textHeight + padY * 2);

  offscreen.width = canvasWidth;
  offscreen.height = canvasHeight;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = font.replace(/__SIZE__/g, `${baseFontSize}px`);
  try {
    (ctx as unknown as { letterSpacing?: string }).letterSpacing = letterSpacing;
  } catch {
    // fallback
  }
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  const drawX = padX;
  const drawY = padY + actualAscent;

  // Deep Editorial Drop Shadow
  if (hasShadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.96)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 20;
  }

  if (isGold) {
    const grad = ctx.createLinearGradient(drawX, drawY - actualAscent, drawX + textWidth * 0.95, drawY + actualDescent);
    grad.addColorStop(0, '#fff6e0');
    grad.addColorStop(0.35, '#ecd08e');
    grad.addColorStop(0.75, '#c79846');
    grad.addColorStop(1, '#8f6823');
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = color;
  }

  ctx.fillText(text, drawX, drawY);

  const texture = new THREE.CanvasTexture(offscreen);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  const contentAspect = (textWidth + padX * 2) / (textHeight + padY * 2);
  return { texture, aspect: contentAspect };
}

/**
 * Creates soft volumetric bloom gradient texture for horizon laser
 */
function createBloomHazeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, 'rgba(236, 208, 142, 0)');
  grad.addColorStop(0.5, 'rgba(236, 208, 142, 0.95)');
  grad.addColorStop(1, 'rgba(236, 208, 142, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Calculates exact world-space position and plane size from 2D screen pixel coordinates using Camera Unprojection
 */
function calculateWorldSpaceTransform(
  camera: THREE.PerspectiveCamera,
  refWidth: number,
  refHeight: number,
  pixelLeft: number,
  pixelTop: number,
  pixelWidth: number,
  depthZ: number,
  textureAspect: number
): { position: THREE.Vector3; planeWidth: number; planeHeight: number } {
  const estHeight = pixelWidth / textureAspect;
  const centerPxX = pixelLeft + pixelWidth / 2;
  const centerPxY = pixelTop + estHeight / 2;

  const ndcX = (centerPxX / refWidth) * 2 - 1;
  const ndcY = 1 - (centerPxY / refHeight) * 2;

  const rayVector = new THREE.Vector3(ndcX, ndcY, 0.5);
  rayVector.unproject(camera);
  const rayDir = rayVector.sub(camera.position).normalize();

  const distance = (depthZ - camera.position.z) / rayDir.z;
  const worldPos = camera.position.clone().add(rayDir.multiplyScalar(distance));

  const vFovRad = THREE.MathUtils.degToRad(camera.fov);
  const frustumHeightAtDepth = 2 * Math.tan(vFovRad / 2) * Math.abs(distance);
  const frustumWidthAtDepth = frustumHeightAtDepth * camera.aspect;

  const worldWidth = (pixelWidth / refWidth) * frustumWidthAtDepth;
  const worldHeight = worldWidth / textureAspect;

  return { position: worldPos, planeWidth: worldWidth, planeHeight: worldHeight };
}

export const Act2TrueRenderer: React.FC<Act2TrueRendererProps> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneStateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    disposables: Array<{ dispose: () => void }>;
    reqId?: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    const disposables: Array<{ dispose: () => void }> = [];

    const refWidth = 1672;
    const refHeight = 941;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. SCENE SETUP (Deep Pitch Obsidian Black Environment)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050608');
    scene.fog = new THREE.FogExp2('#050608', 0.010);

    // 2. PERSPECTIVE CAMERA (Calibrated to Target 42° FOV)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 300);
    camera.position.set(0, 0, 18.0);
    camera.lookAt(new THREE.Vector3(0.55, -0.35, 0));

    // 3. WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING SYSTEM (Controlled Cinematic Grazing Lights)
    const ambientLight = new THREE.AmbientLight('#08090c', 0.32);
    scene.add(ambientLight);

    // Grazing key light hitting right wall metallic fins
    const rightWallKeyLight = new THREE.DirectionalLight('#ffffff', 4.8);
    rightWallKeyLight.position.set(22, 18, 14);
    scene.add(rightWallKeyLight);

    // Soft fill along the left curved wall
    const leftWallFill = new THREE.DirectionalLight('#ecd08e', 1.5);
    leftWallFill.position.set(-14, 8, 12);
    scene.add(leftWallFill);

    // Horizon Point Light
    const laserPoint = new THREE.PointLight('#ecd08e', 3.8, 35);
    laserPoint.position.set(4, -1.2, 2);
    scene.add(laserPoint);

    // =======================================================================
    // 5. THE ARCHITECTURAL ROOM RIG (`roomRig`)
    // =======================================================================
    const roomRig = new THREE.Group();
    scene.add(roomRig);

    // -----------------------------------------------------------------------
    // A. LEFT-TO-RIGHT CURVING BACK WALL (Protruding Left -> Deep Right Corner)
    // -----------------------------------------------------------------------
    const segmentsX = 40;
    const curveWidth = 60;
    const curveHeight = 32;
    const backWallGeo = new THREE.PlaneGeometry(curveWidth, curveHeight, segmentsX, 1);
    const posAttr = backWallGeo.attributes.position;

    // Apply smooth logarithmic curvature: left side (x < 0) is closer to viewer, curving back into depth on right
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const u = (vx + curveWidth / 2) / curveWidth;
      const vz = 4.0 - Math.pow(u, 1.35) * 32.0;
      posAttr.setZ(i, vz);
    }
    backWallGeo.computeVertexNormals();

    const backWallMat = new THREE.MeshStandardMaterial({
      color: '#07080a',
      roughness: 0.35,
      metalness: 0.70,
    });
    const backWallMesh = new THREE.Mesh(backWallGeo, backWallMat);
    backWallMesh.position.set(-4.0, 5.5, -4.0);
    roomRig.add(backWallMesh);
    disposables.push(backWallGeo, backWallMat);

    // -----------------------------------------------------------------------
    // B. RIGHT ANGLE WALL (Merging into the Right Vanishing Corner Seam)
    // -----------------------------------------------------------------------
    const rightWallBaseGeo = new THREE.PlaneGeometry(36, 120);
    const rightWallBaseMat = new THREE.MeshStandardMaterial({
      color: '#060709',
      roughness: 0.3,
      metalness: 0.85,
    });
    const rightWallMesh = new THREE.Mesh(rightWallBaseGeo, rightWallBaseMat);
    rightWallMesh.rotation.y = -Math.PI / 2 + 0.32;
    rightWallMesh.position.set(24.5, 4.0, -26);
    roomRig.add(rightWallMesh);
    disposables.push(rightWallBaseGeo, rightWallBaseMat);

    // 16 Thick Architectural Metallic Fins/Louvers on Right Wall
    const finsCount = 16;
    for (let i = 0; i < finsCount; i++) {
      const t = i / (finsCount - 1);
      const y = 14.5 - t * 20.0;
      const finLength = 115;

      const finGeo = new THREE.BoxGeometry(2.6, 0.24, finLength);
      const finMat = new THREE.MeshStandardMaterial({
        color: '#0b0c10',
        roughness: 0.16,
        metalness: 0.94,
      });
      const finMesh = new THREE.Mesh(finGeo, finMat);
      finMesh.rotation.y = -Math.PI / 2 + 0.32;
      finMesh.position.set(23.2, y, -26);
      roomRig.add(finMesh);
      disposables.push(finGeo, finMat);

      // Specular Top Edge Bevel
      const edgeGeo = new THREE.BoxGeometry(0.08, 0.06, finLength);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.02,
        metalness: 0.99,
        emissive: '#ffffff',
        emissiveIntensity: 0.75 + (1 - t) * 0.5,
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.rotation.y = -Math.PI / 2 + 0.32;
      edgeMesh.position.set(21.85, y + 0.12, -26);
      roomRig.add(edgeMesh);
      disposables.push(edgeGeo, edgeMat);
    }

    // Dominant Upper Right Silver Blade
    const bladeGeo = new THREE.BoxGeometry(0.48, 0.48, 120);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 1.6,
      roughness: 0.02,
      metalness: 0.99,
    });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.rotation.y = -Math.PI / 2 + 0.32;
    bladeMesh.position.set(21.6, 15.2, -26);
    roomRig.add(bladeMesh);
    disposables.push(bladeGeo, bladeMat);

    // -----------------------------------------------------------------------
    // C. GLOSSY OBSIDIAN FLOOR & VELOCITY SPEED RAILS
    // -----------------------------------------------------------------------
    const floorGeo = new THREE.PlaneGeometry(80, 130);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#050608',
      roughness: 0.12,
      metalness: 0.88,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -5.2, -25);
    roomRig.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // Broad Deep Dark-Silver Floor Sheens
    const broadSweeps = [
      { x: -18, width: 11, roughness: 0.14, color: '#080a0f' },
      { x: -5, width: 10, roughness: 0.10, color: '#0b0d13' },
      { x: 8, width: 9, roughness: 0.12, color: '#090b10' },
      { x: 20, width: 14, roughness: 0.08, color: '#0d1017' },
    ];

    broadSweeps.forEach((sweep, idx) => {
      const sweepGeo = new THREE.PlaneGeometry(sweep.width, 125);
      const sweepMat = new THREE.MeshStandardMaterial({
        color: sweep.color,
        roughness: sweep.roughness,
        metalness: 0.92,
      });
      const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
      sweepMesh.rotation.x = -Math.PI / 2;
      sweepMesh.position.set(sweep.x, -5.19 + idx * 0.002, -25);
      roomRig.add(sweepMesh);
      disposables.push(sweepGeo, sweepMat);
    });

    // Speed Rails along the floor
    const railConfigs = [
      { x: -20, width: 0.06, color: '#ffffff', emissive: 0.4 },
      { x: -12, width: 0.04, color: '#555b68', emissive: 0.2 },
      { x: -4, width: 0.08, color: '#ffffff', emissive: 0.7 },
      { x: 5, width: 0.14, color: '#ecd08e', emissive: 2.8 }, // Champagne Gold
      { x: 12, width: 0.18, color: '#dfbd78', emissive: 3.4 }, // Champagne Gold
      { x: 21, width: 0.12, color: '#ffffff', emissive: 1.3 },
    ];

    railConfigs.forEach((cfg) => {
      const railGeo = new THREE.BoxGeometry(cfg.width, 0.03, 125);
      const railMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: cfg.emissive,
        roughness: 0.05,
        metalness: 0.98,
      });
      const railMesh = new THREE.Mesh(railGeo, railMat);
      railMesh.position.set(cfg.x, -5.17, -25);
      roomRig.add(railMesh);
      disposables.push(railGeo, railMat);
    });

    // -----------------------------------------------------------------------
    // D. RADIANT GOLD LASER HORIZON & UPPER VELOCITY SLASH
    // -----------------------------------------------------------------------
    // High-Intensity Laser Filament running along the wall-floor junction
    const horizonCoreGeo = new THREE.BoxGeometry(65, 0.09, 0.09);
    const horizonCoreMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    const horizonCoreMesh = new THREE.Mesh(horizonCoreGeo, horizonCoreMat);
    horizonCoreMesh.position.set(0, -1.05, -10.5);
    roomRig.add(horizonCoreMesh);
    disposables.push(horizonCoreGeo, horizonCoreMat);

    // Radiant Gold Bloom Strip
    const bloomHazeTex = createBloomHazeTexture();
    disposables.push(bloomHazeTex);
    const horizonGlowGeo = new THREE.PlaneGeometry(65, 1.1);
    const horizonGlowMat = new THREE.MeshBasicMaterial({
      map: bloomHazeTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.94,
    });
    const horizonGlowMesh = new THREE.Mesh(horizonGlowGeo, horizonGlowMat);
    horizonGlowMesh.position.set(0, -1.05, -10.52);
    roomRig.add(horizonGlowMesh);
    disposables.push(horizonGlowGeo, horizonGlowMat);

    // Upper Diagonal Champagne Velocity Slash behind "We"
    const slashGeo = new THREE.BoxGeometry(55, 0.04, 0.04);
    const slashMat = new THREE.MeshStandardMaterial({
      color: '#ecd08e',
      emissive: '#ecd08e',
      emissiveIntensity: 2.5,
    });
    const slashMesh = new THREE.Mesh(slashGeo, slashMat);
    slashMesh.position.set(-6, 6.4, -14);
    slashMesh.rotation.z = -0.055;
    roomRig.add(slashMesh);
    disposables.push(slashGeo, slashMat);

    // =======================================================================
    // 6. WORLD-SPACE TYPOGRAPHY (Unprojected to Exact Reference Anchors)
    // =======================================================================
    const typographyConfigs: TypographyConfig[] = [
      {
        id: 'we',
        text: 'We',
        font: '900 __SIZE__ "Inter", "Plus Jakarta Sans", sans-serif',
        color: '#ffffff',
        letterSpacing: '-12px',
        pixelLeft: 237,
        pixelTop: 128,
        pixelWidth: 370,
        depthZ: 3.5,
        yawOffset: -0.06,
        pitchOffset: -0.02,
        rollOffset: -0.045,
      },
      {
        id: 'sellout',
        text: 'sell-out',
        font: 'italic 400 __SIZE__ "Playfair Display", serif',
        color: '#ecd08e',
        isGold: true,
        pixelLeft: 744,
        pixelTop: 228,
        pixelWidth: 505,
        depthZ: 1.2,
        yawOffset: -0.08,
        pitchOffset: -0.02,
        rollOffset: -0.040,
      },
      {
        id: 'your',
        text: 'your',
        font: 'italic 400 __SIZE__ "Playfair Display", serif',
        color: '#ffffff',
        pixelLeft: 217,
        pixelTop: 385,
        pixelWidth: 368,
        depthZ: 2.4,
        yawOffset: -0.06,
        pitchOffset: -0.02,
        rollOffset: -0.045,
      },
      {
        id: 'realestate',
        text: 'real estate',
        font: '900 __SIZE__ "Inter", "Plus Jakarta Sans", sans-serif',
        color: '#ffffff',
        letterSpacing: '-14px',
        pixelLeft: 710,
        pixelTop: 395,
        pixelWidth: 720,
        depthZ: 0.0,
        yawOffset: -0.10,
        pitchOffset: -0.02,
        rollOffset: -0.045,
      },
      {
        id: 'project',
        text: 'project',
        font: '200 __SIZE__ "Inter", "Plus Jakarta Sans", sans-serif',
        color: '#ffffff',
        letterSpacing: '-8px',
        pixelLeft: 715,
        pixelTop: 565,
        pixelWidth: 670,
        depthZ: -1.2,
        yawOffset: -0.10,
        pitchOffset: -0.02,
        rollOffset: -0.045,
      },
    ];

    const initTypography = async () => {
      try {
        await Promise.all([
          document.fonts.load('900 260px "Inter"'),
          document.fonts.load('italic 400 260px "Playfair Display"'),
          document.fonts.load('200 260px "Inter"'),
          document.fonts.ready,
        ]);
      } catch {
        // Fallback gracefully
      }
      if (isDisposed) return;

      typographyConfigs.forEach((cfg) => {
        const { texture, aspect } = createCrispTextTexture(
          cfg.text,
          cfg.font,
          cfg.color,
          cfg.isGold,
          cfg.letterSpacing || '0px',
          true
        );
        disposables.push(texture);

        const transform = calculateWorldSpaceTransform(
          camera,
          refWidth,
          refHeight,
          cfg.pixelLeft,
          cfg.pixelTop,
          cfg.pixelWidth,
          cfg.depthZ,
          aspect
        );

        const textGeo = new THREE.PlaneGeometry(transform.planeWidth, transform.planeHeight);
        const textMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
        });

        const textMesh = new THREE.Mesh(textGeo, textMat);
        textMesh.position.copy(transform.position);
        textMesh.rotation.y = cfg.yawOffset || -0.08;
        textMesh.rotation.x = cfg.pitchOffset || -0.02;
        textMesh.rotation.z = cfg.rollOffset || -0.045;
        scene.add(textMesh);
        disposables.push(textGeo, textMat);

        // Add Inverted Floor Reflection for "project"
        if (cfg.id === 'project') {
          const reflMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.14,
            depthWrite: false,
          });
          const reflMesh = new THREE.Mesh(textGeo, reflMat);
          reflMesh.position.set(transform.position.x, transform.position.y - transform.planeHeight * 0.95, transform.position.z - 0.4);
          reflMesh.scale.set(1, -0.55, 1);
          reflMesh.rotation.y = cfg.yawOffset || -0.08;
          reflMesh.rotation.x = -(cfg.pitchOffset || -0.02);
          reflMesh.rotation.z = -(cfg.rollOffset || -0.045);
          scene.add(reflMesh);
          disposables.push(reflMat);
        }
      });
    };
    initTypography();

    // 7. RENDER LOOP
    const animate = () => {
      if (isDisposed) return;
      renderer.render(scene, camera);
      sceneStateRef.current!.reqId = requestAnimationFrame(animate);
    };

    sceneStateRef.current = {
      scene,
      camera,
      renderer,
      disposables,
    };
    animate();

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      if (sceneStateRef.current?.reqId) {
        cancelAnimationFrame(sceneStateRef.current.reqId);
      }
      disposables.forEach((item) => {
        try {
          item.dispose();
        } catch {
          // ignore
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`act2-true-renderer absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    />
  );
};
