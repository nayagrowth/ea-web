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
  pixelLeft: number;
  pixelTop: number;
  pixelWidth: number;
  depthZ: number;
  yawOffset?: number;
  pitchOffset?: number;
  rollOffset?: number;
}

/**
 * Creates high-resolution 4K canvas texture with exact glyph measurement, drop shadow, and crisp anti-aliasing
 */
function createCrispTextTexture(
  text: string,
  font: string,
  color: string,
  isGold: boolean = false,
  hasShadow: boolean = true
): { texture: THREE.CanvasTexture; aspect: number } {
  const offscreen = document.createElement('canvas');
  const ctx = offscreen.getContext('2d', { willReadFrequently: true })!;

  // 4x supersampling base font size for razor-sharp rendering in 3D perspective
  const baseFontSize = 240;
  ctx.font = font.replace(/__SIZE__/g, `${baseFontSize}px`);
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
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  const drawX = padX;
  const drawY = padY + actualAscent;

  // Cinematic Deep Drop Shadow
  if (hasShadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 16;
  }

  if (isGold) {
    const grad = ctx.createLinearGradient(drawX, drawY - actualAscent, drawX + textWidth * 0.9, drawY + actualDescent);
    grad.addColorStop(0, '#fff4db');
    grad.addColorStop(0.35, '#ecd08e');
    grad.addColorStop(0.75, '#c79846');
    grad.addColorStop(1, '#946c26');
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
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, 'rgba(236, 208, 142, 0)');
  grad.addColorStop(0.5, 'rgba(236, 208, 142, 0.85)');
  grad.addColorStop(1, 'rgba(236, 208, 142, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 128);

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

  // NDC [-1, 1]
  const ndcX = (centerPxX / refWidth) * 2 - 1;
  const ndcY = 1 - (centerPxY / refHeight) * 2;

  // Unproject ray through camera
  const rayVector = new THREE.Vector3(ndcX, ndcY, 0.5);
  rayVector.unproject(camera);
  const rayDir = rayVector.sub(camera.position).normalize();

  // Intersect with chosen world Z depth plane
  const distance = (depthZ - camera.position.z) / rayDir.z;
  const worldPos = camera.position.clone().add(rayDir.multiplyScalar(distance));

  // Compute world width to match exact screen pixel scale
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
    scene.fog = new THREE.FogExp2('#050608', 0.012);

    // 2. PERSPECTIVE CAMERA (Calibrated FOV 42°)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 300);
    camera.position.set(0, 0, 18.0);
    camera.lookAt(new THREE.Vector3(0.5, -0.3, 0));

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

    // 4. LIGHTING SYSTEM (Controlled Moody Specular Grazing Lights)
    const ambientLight = new THREE.AmbientLight('#08090c', 0.25);
    scene.add(ambientLight);

    // Sharp grazing directional key light along the right architectural wall louvers
    const wallKeyLight = new THREE.DirectionalLight('#ffffff', 4.2);
    wallKeyLight.position.set(18, 14, 12);
    scene.add(wallKeyLight);

    // Floor specular grazing light
    const floorKeyLight = new THREE.DirectionalLight('#ffffff', 1.8);
    floorKeyLight.position.set(-6, 12, 10);
    scene.add(floorKeyLight);

    // Warm champagne accent light along horizon
    const laserLight = new THREE.PointLight('#ecd08e', 3.2, 35);
    laserLight.position.set(4, -1.2, 2);
    scene.add(laserLight);

    // =======================================================================
    // 5. ONE UNIFIED 3D WORLD COORDINATE GROUP (`act2World`)
    // =======================================================================
    const act2World = new THREE.Group();
    // Calibrated spatial corridor tilt: yaw ~ -25.7°, pitch ~ -5.5°
    act2World.rotation.y = -0.448;
    act2World.rotation.x = -0.096;
    scene.add(act2World);

    // -----------------------------------------------------------------------
    // A. GLOSSY BLACK TARMAC / LACQUER FLOOR & BROAD REFLECTIVE PANELS
    // -----------------------------------------------------------------------
    // Base Floor Mesh (Glossy Pitch-Black Lacquer)
    const floorGeo = new THREE.PlaneGeometry(75, 120);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#050608',
      roughness: 0.12,
      metalness: 0.85,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -5.2, -30);
    act2World.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // Broad Deep Dark-Silver Floor Sheens
    const broadSweeps = [
      { x: -16, width: 10, roughness: 0.14, color: '#090a0f' },
      { x: -4, width: 9, roughness: 0.10, color: '#0c0e14' },
      { x: 8, width: 8, roughness: 0.12, color: '#0a0c11' },
      { x: 18, width: 12, roughness: 0.08, color: '#0e1118' },
    ];

    broadSweeps.forEach((sweep, idx) => {
      const sweepGeo = new THREE.PlaneGeometry(sweep.width, 115);
      const sweepMat = new THREE.MeshStandardMaterial({
        color: sweep.color,
        roughness: sweep.roughness,
        metalness: 0.90,
      });
      const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
      sweepMesh.rotation.x = -Math.PI / 2;
      sweepMesh.position.set(sweep.x, -5.19 + idx * 0.002, -30);
      act2World.add(sweepMesh);
      disposables.push(sweepGeo, sweepMat);
    });

    // Metallic Speed Rails recessed into floor
    const railConfigs = [
      { x: -18, width: 0.06, color: '#ffffff', emissive: 0.4 },
      { x: -11, width: 0.04, color: '#555b68', emissive: 0.2 },
      { x: -3, width: 0.08, color: '#ffffff', emissive: 0.7 },
      { x: 4, width: 0.14, color: '#ecd08e', emissive: 2.6 }, // Champagne Gold
      { x: 11, width: 0.18, color: '#dfbd78', emissive: 3.2 }, // Champagne Gold
      { x: 19, width: 0.12, color: '#ffffff', emissive: 1.2 },
    ];

    railConfigs.forEach((cfg) => {
      const railGeo = new THREE.BoxGeometry(cfg.width, 0.03, 115);
      const railMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: cfg.emissive,
        roughness: 0.05,
        metalness: 0.98,
      });
      const railMesh = new THREE.Mesh(railGeo, railMat);
      railMesh.position.set(cfg.x, -5.17, -30);
      act2World.add(railMesh);
      disposables.push(railGeo, railMat);
    });

    // -----------------------------------------------------------------------
    // B. RIGHT ARCHITECTURAL WALL & 16 BEVELED METALLIC LOUVER FINS
    // -----------------------------------------------------------------------
    // Wall Backplane
    const wallBaseGeo = new THREE.PlaneGeometry(32, 115);
    const wallBaseMat = new THREE.MeshStandardMaterial({
      color: '#07080a',
      roughness: 0.4,
      metalness: 0.85,
    });
    const wallBaseMesh = new THREE.Mesh(wallBaseGeo, wallBaseMat);
    wallBaseMesh.rotation.y = -Math.PI / 2;
    wallBaseMesh.position.set(24.0, 4.0, -30);
    act2World.add(wallBaseMesh);
    disposables.push(wallBaseGeo, wallBaseMat);

    // 16 Thick Architectural Louver Fins with Real Specular Edge Bevels
    const finsCount = 16;
    for (let i = 0; i < finsCount; i++) {
      const t = i / (finsCount - 1);
      const y = 13.0 - t * 18.5;
      const finLength = 110;

      // Dark Metallic Louver Fin Body
      const finGeo = new THREE.BoxGeometry(2.4, 0.22, finLength);
      const finMat = new THREE.MeshStandardMaterial({
        color: '#0c0d12',
        roughness: 0.18,
        metalness: 0.92,
      });
      const finMesh = new THREE.Mesh(finGeo, finMat);
      finMesh.position.set(22.8, y, -30);
      act2World.add(finMesh);
      disposables.push(finGeo, finMat);

      // Specular Top Edge Bevel catching grazing light
      const edgeGeo = new THREE.BoxGeometry(0.08, 0.05, finLength);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.02,
        metalness: 0.99,
        emissive: '#ffffff',
        emissiveIntensity: 0.6 + (1 - t) * 0.4,
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.position.set(21.55, y + 0.11, -30);
      act2World.add(edgeMesh);
      disposables.push(edgeGeo, edgeMat);
    }

    // Dominant Upper Right Silver Blade (Structural Beveled Extrusion)
    const bladeGeo = new THREE.BoxGeometry(0.45, 0.45, 115);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 1.4,
      roughness: 0.02,
      metalness: 0.99,
    });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.set(21.4, 13.8, -30);
    act2World.add(bladeMesh);
    disposables.push(bladeGeo, bladeMat);

    // -----------------------------------------------------------------------
    // C. RADIANT GOLDEN HORIZON LASER BEAM & UPPER VELOCITY SLASH
    // -----------------------------------------------------------------------
    // Core High-Intensity Horizon Laser Filament
    const horizonCoreGeo = new THREE.BoxGeometry(60, 0.08, 0.08);
    const horizonCoreMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    const horizonCoreMesh = new THREE.Mesh(horizonCoreGeo, horizonCoreMat);
    horizonCoreMesh.position.set(0, -1.1, -12);
    act2World.add(horizonCoreMesh);
    disposables.push(horizonCoreGeo, horizonCoreMat);

    // Radiant Gold Bloom Strip
    const bloomHazeTex = createBloomHazeTexture();
    disposables.push(bloomHazeTex);
    const horizonGlowGeo = new THREE.PlaneGeometry(60, 0.95);
    const horizonGlowMat = new THREE.MeshBasicMaterial({
      map: bloomHazeTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    });
    const horizonGlowMesh = new THREE.Mesh(horizonGlowGeo, horizonGlowMat);
    horizonGlowMesh.position.set(0, -1.1, -12.02);
    act2World.add(horizonGlowMesh);
    disposables.push(horizonGlowGeo, horizonGlowMat);

    // Upper Diagonal Champagne Velocity Slash behind "We"
    const slashGeo = new THREE.BoxGeometry(50, 0.04, 0.04);
    const slashMat = new THREE.MeshStandardMaterial({
      color: '#ecd08e',
      emissive: '#ecd08e',
      emissiveIntensity: 2.2,
    });
    const slashMesh = new THREE.Mesh(slashGeo, slashMat);
    slashMesh.position.set(-6, 6.2, -15);
    slashMesh.rotation.z = -0.06;
    act2World.add(slashMesh);
    disposables.push(slashGeo, slashMat);

    // =======================================================================
    // 6. WORLD-SPACE TYPOGRAPHY (Exact Unprojected Reference Geometry)
    // =======================================================================
    const typographyConfigs: TypographyConfig[] = [
      {
        id: 'we',
        text: 'We',
        font: '900 __SIZE__ "Inter", "Plus Jakarta Sans", sans-serif',
        color: '#ffffff',
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
        await document.fonts.ready;
      } catch {
        // Fallback gracefully
      }
      if (isDisposed) return;

      typographyConfigs.forEach((cfg) => {
        const { texture, aspect } = createCrispTextTexture(cfg.text, cfg.font, cfg.color, cfg.isGold, true);
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
