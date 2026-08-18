import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Act2TrueRendererProps {
  progress?: number;
  className?: string;
}

/**
 * Creates high-resolution 2D canvas texture for crisp, anti-aliased world-space typography
 */
function createTextTexture(
  text: string,
  font: string,
  color: string,
  width: number = 2048,
  height: number = 512,
  isGold: boolean = false
): { texture: THREE.CanvasTexture; aspect: number } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = font;

  if (isGold) {
    const grad = ctx.createLinearGradient(0, 0, width * 0.6, height);
    grad.addColorStop(0, '#fcebc2');
    grad.addColorStop(0.45, '#ecd08e');
    grad.addColorStop(1, '#c79846');
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = color;
  }

  // Draw crisp text
  ctx.fillText(text, 20, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return { texture, aspect: width / height };
}

export const Act2TrueRenderer: React.FC<Act2TrueRendererProps> = ({
  progress = 1.0,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    textMeshes: { [key: string]: THREE.Mesh };
    corridorGroup: THREE.Group;
    laserMesh: THREE.Mesh;
    reqId?: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. SCENE & CAMERA (Calibrated to Target 1672x941 Convergence)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08090a');
    scene.fog = new THREE.FogExp2('#08090a', 0.015);

    // FOV 42 calibrated to right vanishing point ~(1427, 588)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    camera.position.set(0, 0, 16.5);
    camera.lookAt(new THREE.Vector3(0.5, -0.3, 0));

    // 2. WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight('#0e1014', 1.0);
    scene.add(ambientLight);

    // Grazing key light on right wall
    const dirLight = new THREE.DirectionalLight('#ffffff', 2.8);
    dirLight.position.set(14, 8, 10);
    scene.add(dirLight);

    // Warm champagne accent point light
    const pointLight = new THREE.PointLight('#ecd08e', 2.2, 25);
    pointLight.position.set(2, -1, 4);
    scene.add(pointLight);

    // 4. CORRIDOR WORLD GROUP (Rotated by calibrated yaw/pitch: yaw ~ -25.7°, pitch ~ -5.5°)
    const corridorGroup = new THREE.Group();
    corridorGroup.rotation.y = -0.448; // -25.7 degrees
    corridorGroup.rotation.x = -0.096; // -5.5 degrees
    scene.add(corridorGroup);

    // -----------------------------------------------------------------------
    // A. GLOSSY REFLECTIVE FLOOR & VELOCITY SPEED RAILS
    // -----------------------------------------------------------------------
    const floorGeo = new THREE.PlaneGeometry(50, 90);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#08090b',
      roughness: 0.16,
      metalness: 0.90,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -4.5, -25);
    corridorGroup.add(floorMesh);

    // Physical Speed Rails on floor
    const railConfigs = [
      { x: -12, color: '#ffffff', width: 0.06, emissive: 0.6 },
      { x: -7, color: '#656b78', width: 0.04, emissive: 0.2 },
      { x: -2, color: '#ffffff', width: 0.08, emissive: 0.8 },
      { x: 3, color: '#ecd08e', width: 0.12, emissive: 2.4 }, // Champagne Gold
      { x: 8, color: '#dfbd78', width: 0.14, emissive: 2.8 }, // Champagne Gold
      { x: 13, color: '#ffffff', width: 0.09, emissive: 1.2 },
    ];

    railConfigs.forEach((cfg) => {
      const railGeo = new THREE.BoxGeometry(cfg.width, 0.03, 85);
      const railMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: cfg.emissive,
        roughness: 0.1,
        metalness: 0.95,
      });
      const railMesh = new THREE.Mesh(railGeo, railMat);
      railMesh.position.set(cfg.x, -4.48, -25);
      corridorGroup.add(railMesh);
    });

    // -----------------------------------------------------------------------
    // B. RIGHT ARCHITECTURAL METALLIC RIBBED LOUVERS (14 Slats)
    // -----------------------------------------------------------------------
    const wallBaseGeo = new THREE.PlaneGeometry(25, 85);
    const wallBaseMat = new THREE.MeshStandardMaterial({
      color: '#0c0d10',
      roughness: 0.6,
      metalness: 0.7,
    });
    const wallBaseMesh = new THREE.Mesh(wallBaseGeo, wallBaseMat);
    wallBaseMesh.rotation.y = -Math.PI / 2;
    wallBaseMesh.position.set(16.5, 3.5, -25);
    corridorGroup.add(wallBaseMesh);

    // 14 Louver Slats
    const ribsCount = 14;
    for (let i = 0; i < ribsCount; i++) {
      const t = i / (ribsCount - 1);
      const y = 9.5 - t * 13.5;
      const slatLength = 80;

      // Dark metallic slat body
      const slatGeo = new THREE.BoxGeometry(1.4, 0.12, slatLength);
      const slatMat = new THREE.MeshStandardMaterial({
        color: '#15171d',
        roughness: 0.3,
        metalness: 0.85,
      });
      const slatMesh = new THREE.Mesh(slatGeo, slatMat);
      slatMesh.position.set(15.8, y, -25);
      corridorGroup.add(slatMesh);

      // Specular bright top edge highlight
      const edgeGeo = new THREE.BoxGeometry(0.06, 0.04, slatLength);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffffff',
        emissiveIntensity: 0.8,
        roughness: 0.05,
        metalness: 0.98,
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.position.set(15.1, y + 0.07, -25);
      corridorGroup.add(edgeMesh);
    }

    // Dominant Silver Upper Blade Trim
    const bladeGeo = new THREE.BoxGeometry(0.18, 0.18, 85);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 1.4,
      roughness: 0.05,
      metalness: 0.98,
    });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.set(15.0, 10.2, -25);
    corridorGroup.add(bladeMesh);

    // -----------------------------------------------------------------------
    // C. RADIANT GOLDEN LASER HORIZON BEAM
    // -----------------------------------------------------------------------
    const laserGeo = new THREE.BoxGeometry(45, 0.08, 0.08);
    const laserMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, -0.8, -10);
    scene.add(laserMesh);

    // Ambient gold bloom halo
    const haloGeo = new THREE.PlaneGeometry(45, 0.8);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#ecd08e',
      transparent: true,
      opacity: 0.7,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(0, -0.8, -10.05);
    scene.add(haloMesh);

    // -----------------------------------------------------------------------
    // D. WORLD-SPACE HIGH-RESOLUTION TYPOGRAPHY PLANES
    // -----------------------------------------------------------------------
    const textMeshes: { [key: string]: THREE.Mesh } = {};

    // 1. "We" (Ultra-Bold Heavy Sans)
    const weTex = createTextTexture('We', '900 320px "Inter", "Plus Jakarta Sans", sans-serif', '#ffffff', 1024, 512);
    const weGeo = new THREE.PlaneGeometry(5.2, 5.2 / weTex.aspect);
    const weMat = new THREE.MeshBasicMaterial({ map: weTex.texture, transparent: true });
    const weMesh = new THREE.Mesh(weGeo, weMat);
    weMesh.position.set(-5.6, 3.4, 2.5);
    weMesh.rotation.set(-0.02, -0.10, -0.05);
    scene.add(weMesh);
    textMeshes['we'] = weMesh;

    // 2. "sell-out" (Editorial Italic Serif in Champagne Gold)
    const sellTex = createTextTexture('sell-out', 'italic 400 270px "Playfair Display", serif', '#ecd08e', 1536, 512, true);
    const sellGeo = new THREE.PlaneGeometry(6.4, 6.4 / sellTex.aspect);
    const sellMat = new THREE.MeshBasicMaterial({ map: sellTex.texture, transparent: true });
    const sellMesh = new THREE.Mesh(sellGeo, sellMat);
    sellMesh.position.set(1.4, 2.0, 0.4);
    sellMesh.rotation.set(-0.01, -0.12, -0.04);
    scene.add(sellMesh);
    textMeshes['sellout'] = sellMesh;

    // 3. "your" (Editorial Italic Serif in Crisp White)
    const yourTex = createTextTexture('your', 'italic 400 300px "Playfair Display", serif', '#ffffff', 1280, 512);
    const yourGeo = new THREE.PlaneGeometry(5.6, 5.6 / yourTex.aspect);
    const yourMat = new THREE.MeshBasicMaterial({ map: yourTex.texture, transparent: true });
    const yourMesh = new THREE.Mesh(yourGeo, yourMat);
    yourMesh.position.set(-5.8, -0.2, 2.0);
    yourMesh.rotation.set(-0.02, -0.10, -0.05);
    scene.add(yourMesh);
    textMeshes['your'] = yourMesh;

    // 4. "real estate" (Ultra-Bold Heavy Sans in Crisp White)
    const realTex = createTextTexture('real estate', '900 290px "Inter", "Plus Jakarta Sans", sans-serif', '#ffffff', 2048, 512);
    const realGeo = new THREE.PlaneGeometry(9.2, 9.2 / realTex.aspect);
    const realMat = new THREE.MeshBasicMaterial({ map: realTex.texture, transparent: true });
    const realMesh = new THREE.Mesh(realGeo, realMat);
    realMesh.position.set(0.6, -0.2, -0.2);
    realMesh.rotation.set(-0.02, -0.14, -0.05);
    scene.add(realMesh);
    textMeshes['realestate'] = realMesh;

    // 5. "project" (Light Clean Sans in Crisp White)
    const projTex = createTextTexture('project', '200 280px "Inter", "Plus Jakarta Sans", sans-serif', '#ffffff', 1800, 512);
    const projGeo = new THREE.PlaneGeometry(8.2, 8.2 / projTex.aspect);
    const projMat = new THREE.MeshBasicMaterial({ map: projTex.texture, transparent: true });
    const projMesh = new THREE.Mesh(projGeo, projMat);
    projMesh.position.set(0.7, -2.4, -1.0);
    projMesh.rotation.set(-0.02, -0.14, -0.05);
    scene.add(projMesh);
    textMeshes['project'] = projMesh;

    // 6. Inverted Floor Reflection of "project"
    const reflMat = new THREE.MeshBasicMaterial({
      map: projTex.texture,
      transparent: true,
      opacity: 0.12,
    });
    const reflMesh = new THREE.Mesh(projGeo, reflMat);
    reflMesh.position.set(0.7, -3.5, -1.4);
    reflMesh.scale.set(1, -0.55, 1);
    reflMesh.rotation.set(0.02, -0.14, 0.05);
    scene.add(reflMesh);
    textMeshes['projectReflect'] = reflMesh;

    sceneRef.current = {
      scene,
      camera,
      renderer,
      textMeshes,
      corridorGroup,
      laserMesh,
    };

    // Render loop
    const animate = () => {
      // Smooth dynamic camera parallax based on progress or time
      if (sceneRef.current) {
        const cam = sceneRef.current.camera;
        cam.position.z = 16.5 + (1 - progress) * 4.0;
      }
      renderer.render(scene, camera);
      sceneRef.current!.reqId = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.reqId) {
        cancelAnimationFrame(sceneRef.current.reqId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progress]);

  return (
    <div
      ref={mountRef}
      className={`act2-true-renderer absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    />
  );
};
