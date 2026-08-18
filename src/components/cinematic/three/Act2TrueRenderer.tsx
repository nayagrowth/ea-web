import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

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
}

/**
 * Creates high-resolution, tightly cropped 2D canvas texture with exact glyph bounding box measurement
 */
function createCrispTextTexture(
  text: string,
  font: string,
  color: string,
  isGold: boolean = false
): { texture: THREE.CanvasTexture; aspect: number } {
  const offscreen = document.createElement('canvas');
  const ctx = offscreen.getContext('2d', { willReadFrequently: true })!;

  // Measure text with high-resolution base size
  const baseFontSize = 180;
  ctx.font = font.replace(/__SIZE__/g, `${baseFontSize}px`);
  const metrics = ctx.measureText(text);

  const textWidth = Math.ceil(metrics.width);
  const actualAscent = Math.ceil(metrics.actualBoundingBoxAscent || baseFontSize * 0.8);
  const actualDescent = Math.ceil(metrics.actualBoundingBoxDescent || baseFontSize * 0.25);
  const textHeight = actualAscent + actualDescent;

  const padX = 24;
  const padY = 24;
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

  if (isGold) {
    const grad = ctx.createLinearGradient(drawX, drawY - actualAscent, drawX + textWidth * 0.85, drawY + actualDescent);
    grad.addColorStop(0, '#fef1d6');
    grad.addColorStop(0.35, '#ecd08e');
    grad.addColorStop(0.75, '#c79846');
    grad.addColorStop(1, '#9e732b');
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

  // Aspect ratio of the actual text area
  const contentAspect = (textWidth + padX * 2) / (textHeight + padY * 2);
  return { texture, aspect: contentAspect };
}

/**
 * Calculates exact world-space position and size from 2D screen pixel coordinates using Camera Unprojection
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
  // 1. Center of the text bounding box in screen pixels
  const estHeight = pixelWidth / textureAspect;
  const centerPxX = pixelLeft + pixelWidth / 2;
  const centerPxY = pixelTop + estHeight / 2;

  // 2. Convert to Normalized Device Coordinates (NDC: [-1, 1])
  const ndcX = (centerPxX / refWidth) * 2 - 1;
  const ndcY = 1 - (centerPxY / refHeight) * 2;

  // 3. Unproject through PerspectiveCamera
  const rayVector = new THREE.Vector3(ndcX, ndcY, 0.5);
  rayVector.unproject(camera);
  const rayDir = rayVector.sub(camera.position).normalize();

  // 4. Intersect ray with chosen world-space Z depth plane
  const distance = (depthZ - camera.position.z) / rayDir.z;
  const worldPos = camera.position.clone().add(rayDir.multiplyScalar(distance));

  // 5. Compute world plane width based on camera frustum at this distance
  const vFovRad = THREE.MathUtils.degToRad(camera.fov);
  const frustumHeightAtDepth = 2 * Math.tan(vFovRad / 2) * Math.abs(distance);
  const frustumWidthAtDepth = frustumHeightAtDepth * camera.aspect;

  const worldWidth = (pixelWidth / refWidth) * frustumWidthAtDepth;
  const worldHeight = worldWidth / textureAspect;

  return { position: worldPos, planeWidth: worldWidth, planeHeight: worldHeight };
}

export const Act2TrueRenderer: React.FC<Act2TrueRendererProps> = ({
  progress = 1.0,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

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

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08090a');
    scene.fog = new THREE.FogExp2('#08090a', 0.012);

    // 2. PERSPECTIVE CAMERA (Calibrated to Target 42° FOV)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 300);
    camera.position.set(0, 0, 18.0);
    camera.lookAt(new THREE.Vector3(0.6, -0.4, 0));

    // 3. WEBGL RENDERER & PMREM ENVIRONMENT
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // PMREM Environment for physically accurate specular reflections on metallic bevels
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envMap;
    disposables.push(pmremGenerator);

    // 4. LIGHTING SYSTEM (PBR Grazing & Accent Lights)
    const ambientLight = new THREE.AmbientLight('#0a0c10', 0.45);
    scene.add(ambientLight);

    // High-angle directional key light creating metallic grazing edge highlights on louvers
    const keyLight = new THREE.DirectionalLight('#ffffff', 3.8);
    keyLight.position.set(16, 12, 14);
    scene.add(keyLight);

    // Warm champagne fill along the velocity corridor
    const warmFill = new THREE.DirectionalLight('#ecd08e', 1.6);
    warmFill.position.set(-6, 2, 8);
    scene.add(warmFill);

    // Point light at the horizon beam
    const laserPoint = new THREE.PointLight('#ecd08e', 2.4, 30);
    laserPoint.position.set(4, -1.2, 2);
    scene.add(laserPoint);

    // =======================================================================
    // 5. ONE SHARED 3D WORLD RIG (`act2World`)
    // =======================================================================
    const act2World = new THREE.Group();
    // Calibrated spatial corridor tilt: yaw ~ -25.7°, pitch ~ -5.5°
    act2World.rotation.y = -0.448;
    act2World.rotation.x = -0.096;
    scene.add(act2World);

    // -----------------------------------------------------------------------
    // A. DARK TARMAC / LACQUER PHYSICAL FLOOR & BROAD SWEPT PANELS
    // -----------------------------------------------------------------------
    // Base Floor Plane (Physical dark lacquer, not chrome mirror)
    const floorGeo = new THREE.PlaneGeometry(65, 110);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#08090b',
      roughness: 0.22,
      metalness: 0.14,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -5.2, -30);
    act2World.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // Broad Dark-Silver Sweeps (Large shallow floor panels with roughness variation)
    const broadSweeps = [
      { x: -14, width: 9, roughness: 0.18, elev: 0.005, color: '#0d0f14' },
      { x: -3, width: 8, roughness: 0.15, elev: 0.008, color: '#12141a' },
      { x: 7, width: 7, roughness: 0.20, elev: 0.006, color: '#0f1116' },
      { x: 16, width: 10, roughness: 0.16, elev: 0.010, color: '#141720' },
    ];

    broadSweeps.forEach((sweep) => {
      const sweepGeo = new THREE.PlaneGeometry(sweep.width, 105);
      const sweepMat = new THREE.MeshStandardMaterial({
        color: sweep.color,
        roughness: sweep.roughness,
        metalness: 0.25,
      });
      const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
      sweepMesh.rotation.x = -Math.PI / 2;
      sweepMesh.position.set(sweep.x, -5.2 + sweep.elev, -30);
      act2World.add(sweepMesh);
      disposables.push(sweepGeo, sweepMat);
    });

    // Recessed Metallic Speed Rails on the floor
    const railConfigs = [
      { x: -16, width: 0.06, color: '#ffffff', emissive: 0.5 },
      { x: -9, width: 0.04, color: '#656b78', emissive: 0.2 },
      { x: -2, width: 0.08, color: '#ffffff', emissive: 0.7 },
      { x: 4, width: 0.14, color: '#ecd08e', emissive: 2.4 }, // Champagne Gold
      { x: 10, width: 0.16, color: '#dfbd78', emissive: 2.8 }, // Champagne Gold
      { x: 17, width: 0.10, color: '#ffffff', emissive: 1.1 },
    ];

    railConfigs.forEach((cfg) => {
      const railGeo = new THREE.BoxGeometry(cfg.width, 0.03, 105);
      const railMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: cfg.emissive,
        roughness: 0.08,
        metalness: 0.95,
      });
      const railMesh = new THREE.Mesh(railGeo, railMat);
      railMesh.position.set(cfg.x, -5.17, -30);
      act2World.add(railMesh);
      disposables.push(railGeo, railMat);
    });

    // -----------------------------------------------------------------------
    // B. RIGHT ARCHITECTURAL WALL & 14 BEVELED METALLIC LOUVER FINS
    // -----------------------------------------------------------------------
    // Wall Backplane
    const wallBaseGeo = new THREE.PlaneGeometry(30, 105);
    const wallBaseMat = new THREE.MeshStandardMaterial({
      color: '#0a0b0e',
      roughness: 0.5,
      metalness: 0.75,
    });
    const wallBaseMesh = new THREE.Mesh(wallBaseGeo, wallBaseMat);
    wallBaseMesh.rotation.y = -Math.PI / 2;
    wallBaseMesh.position.set(22.0, 4.0, -30);
    act2World.add(wallBaseMesh);
    disposables.push(wallBaseGeo, wallBaseMat);

    // 14 Thick Architectural Fins with Real Physical Thickness and Bevels
    const finsCount = 14;
    for (let i = 0; i < finsCount; i++) {
      const t = i / (finsCount - 1);
      const y = 11.5 - t * 16.5;
      const finLength = 100;

      // Real 3D Louver Fin Body
      const finGeo = new THREE.BoxGeometry(2.2, 0.18, finLength);
      const finMat = new THREE.MeshStandardMaterial({
        color: '#13151b',
        roughness: 0.24,
        metalness: 0.88,
      });
      const finMesh = new THREE.Mesh(finGeo, finMat);
      finMesh.position.set(21.0, y, -30);
      act2World.add(finMesh);
      disposables.push(finGeo, finMat);
    }

    // Dominant Upper Right Silver Blade (Structural Beveled Extrusion)
    const bladeGeo = new THREE.BoxGeometry(0.35, 0.35, 105);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 0.9,
      roughness: 0.05,
      metalness: 0.98,
    });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.set(19.8, 12.2, -30);
    act2World.add(bladeMesh);
    disposables.push(bladeGeo, bladeMat);

    // -----------------------------------------------------------------------
    // C. PHYSICAL GOLDEN HORIZON LASER BEAM
    // -----------------------------------------------------------------------
    const horizonGeo = new THREE.BoxGeometry(55, 0.09, 0.09);
    const horizonMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ecd08e',
      emissiveIntensity: 3.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(0, -1.1, -12);
    act2World.add(horizonMesh);
    disposables.push(horizonGeo, horizonMat);

    // =======================================================================
    // 6. WORLD-SPACE TYPOGRAPHY (Rendered Once Exact Webfonts Load)
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
      },
    ];

    // Load fonts and mount world-space text planes with exact unprojected coordinates
    const initTypography = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // Fallback gracefully
      }
      if (isDisposed) return;

      typographyConfigs.forEach((cfg) => {
        const { texture, aspect } = createCrispTextTexture(cfg.text, cfg.font, cfg.color, cfg.isGold);
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
        textMesh.rotation.z = -0.035;
        scene.add(textMesh);
        disposables.push(textGeo, textMat);
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

    // 8. RESIZE HANDLER (Maintains Exact 1672x941 Reference Framing)
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
