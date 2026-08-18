import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================================================
// 1. ENVIRONMENT: ARCHITECTURAL WALL RIBS (Right-Side Receding Louvers)
// ===========================================================================
interface RibData {
  id: number;
  position: [number, number, number];
  length: number;
}

const WallRibs: React.FC = () => {
  const ribsCount = 14;
  const ribs: RibData[] = useMemo(() => {
    return Array.from({ length: ribsCount }).map((_, i) => {
      const t = i / (ribsCount - 1);
      const y = 3.2 - t * 5.8;
      const z = -t * 12.0;
      const x = 4.2 + (1 - t) * 2.2;
      return { id: i, position: [x, y, z] as [number, number, number], length: 14 + (1 - t) * 4 };
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Solid Dark Wall Backplane */}
      <mesh position={[6.5, 0.2, -6]} rotation={[0, -0.38, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#0b0c0e" roughness={0.7} metalness={0.6} />
      </mesh>

      {/* Dominant Metallic Wall Boundary Edge */}
      <mesh position={[4.6, 1.8, -4.5]} rotation={[0.08, -0.38, -0.06]}>
        <boxGeometry args={[0.08, 0.08, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} emissive="#ffffff" emissiveIntensity={0.25} />
      </mesh>

      {/* Horizontal Louver Slats with Grazing Edge Highlights */}
      {ribs.map((rib: RibData) => (
        <group key={rib.id} position={rib.position} rotation={[0, -0.38, -0.04]}>
          {/* Main Dark Slat */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 0.06, rib.length]} />
            <meshStandardMaterial color="#14161b" roughness={0.35} metalness={0.8} />
          </mesh>
          {/* Specular White Top Edge Highlight */}
          <mesh position={[-0.28, 0.035, 0]}>
            <boxGeometry args={[0.03, 0.02, rib.length]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.95}
              emissive="#ffffff"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// ===========================================================================
// 2. ENVIRONMENT: GLOSSY REFLECTIVE FLOOR & VELOCITY SPEED RAILS
// ===========================================================================
interface FloorRailData {
  x: number;
  z: number;
  rot: number;
  color: string;
  width: number;
  emissive: number;
}

const ReflectiveFloor: React.FC = () => {
  // Speed rails across the floor
  const floorRails: FloorRailData[] = useMemo(() => {
    return [
      { x: -5.0, z: -4.0, rot: -0.16, color: '#ffffff', width: 0.03, emissive: 0.3 },
      { x: -2.8, z: -5.0, rot: -0.14, color: '#656b78', width: 0.02, emissive: 0.1 },
      { x: -0.5, z: -6.0, rot: -0.12, color: '#ffffff', width: 0.035, emissive: 0.4 },
      { x: 1.8, z: -7.0, rot: -0.09, color: '#ecd08e', width: 0.045, emissive: 1.8 }, // Gold
      { x: 3.6, z: -8.0, rot: -0.06, color: '#dfbd78', width: 0.05, emissive: 2.2 },  // Gold
      { x: 5.2, z: -8.5, rot: -0.04, color: '#ffffff', width: 0.04, emissive: 0.8 },
    ];
  }, []);

  return (
    <group position={[0, -2.6, 0]}>
      {/* Dark Glossy Asphalt Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -6]}>
        <planeGeometry args={[28, 24]} />
        <meshStandardMaterial
          color="#08090b"
          roughness={0.18}
          metalness={0.88}
        />
      </mesh>

      {/* Subtle Polished Ground Sheen Strips */}
      <mesh rotation={[-Math.PI / 2, 0, -0.12]} position={[0, 0.005, -5]}>
        <planeGeometry args={[14, 20]} />
        <meshBasicMaterial color="#12141a" transparent opacity={0.45} />
      </mesh>

      {/* Dynamic Velocity Speed Rails */}
      {floorRails.map((rail: FloorRailData, idx: number) => (
        <mesh
          key={idx}
          position={[rail.x, 0.015, rail.z]}
          rotation={[-Math.PI / 2, 0, rail.rot]}
        >
          <planeGeometry args={[rail.width, 22]} />
          <meshStandardMaterial
            color={rail.color}
            emissive={rail.color}
            emissiveIntensity={rail.emissive}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};

// ===========================================================================
// 3. ENVIRONMENT: RADIANT GOLD LASER HORIZON
// ===========================================================================
const LaserHorizon: React.FC = () => {
  return (
    <group position={[0, -0.42, -1.8]}>
      {/* Core Golden Beam */}
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, -0.01]}>
        <planeGeometry args={[18, 0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Champagne Radiant Bloom Layer */}
      <mesh position={[0.5, 0, -0.05]} rotation={[0, 0, -0.01]}>
        <planeGeometry args={[18, 0.22]} />
        <meshBasicMaterial color="#ecd08e" transparent opacity={0.85} />
      </mesh>
      {/* Wide Warm Amber Haze */}
      <mesh position={[0.5, 0, -0.1]} rotation={[0, 0, -0.01]}>
        <planeGeometry args={[18, 0.65]} />
        <meshBasicMaterial color="#c79846" transparent opacity={0.35} />
      </mesh>

      {/* Upper Diagonal Champagne Accent (Behind "We") */}
      <mesh position={[-1.5, 2.2, -1.0]} rotation={[0, 0, -0.06]}>
        <planeGeometry args={[14, 0.025]} />
        <meshBasicMaterial color="#ecd08e" transparent opacity={0.65} />
      </mesh>
    </group>
  );
};

// ===========================================================================
// 4. TRUE 3D TYPOGRAPHY ON DISTINCT DEPTH PLANES
// ===========================================================================
const Typography3D: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* ------------------------------------------------------------------- */}
      {/* ROW 1: "We" (Foreground Heavy Sans) + "sell-out" (Champagne Serif)  */}
      {/* ------------------------------------------------------------------- */}
      {/* "We" */}
      <Text
        position={[-3.4, 1.7, 0.4]}
        rotation={[-0.02, -0.12, -0.055]}
        fontSize={1.45}
        fontWeight={900}
        font="https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2"
        letterSpacing={-0.055}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        We
      </Text>

      {/* "sell-out" */}
      <group position={[0.4, 1.05, -0.2]} rotation={[-0.01, -0.13, -0.05]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.18}
          font="https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2"
          color="#ecd08e"
          anchorX="left"
          anchorY="middle"
        >
          sell-out
        </Text>
      </group>

      {/* ------------------------------------------------------------------- */}
      {/* ROW 2: "your" (Italic Serif Swash) + "real estate" (Heavy Grotesk)  */}
      {/* ------------------------------------------------------------------- */}
      {/* "your" */}
      <Text
        position={[-3.65, -0.15, 0.25]}
        rotation={[-0.02, -0.12, -0.055]}
        fontSize={1.38}
        font="https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2"
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        your
      </Text>

      {/* "real estate" */}
      <Text
        position={[-0.15, -0.12, -0.55]}
        rotation={[-0.02, -0.15, -0.055]}
        fontSize={1.32}
        fontWeight={900}
        font="https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2"
        letterSpacing={-0.055}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        real estate
      </Text>

      {/* ------------------------------------------------------------------- */}
      {/* ROW 3: "project" (Ultra-Light Sans) + Glossy Floor Reflection       */}
      {/* ------------------------------------------------------------------- */}
      {/* "project" */}
      <Text
        position={[-0.12, -1.25, -1.05]}
        rotation={[-0.02, -0.15, -0.055]}
        fontSize={1.24}
        fontWeight={300}
        font="https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2"
        letterSpacing={-0.04}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        project
      </Text>

      {/* Inverted Floor Reflection of "project" */}
      <Text
        position={[-0.12, -1.82, -1.25]}
        rotation={[Math.PI - 0.02, -0.15, 0.055]}
        scale={[1, 0.55, 1]}
        fontSize={1.24}
        fontWeight={300}
        font="https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2"
        letterSpacing={-0.04}
        color="#ffffff"
        fillOpacity={0.12}
        anchorX="left"
        anchorY="middle"
      >
        project
      </Text>
    </group>
  );
};

// ===========================================================================
// 5. CAMERA CONTROLLER & RIG WITH FINE POINTER PARALLAX
// ===========================================================================
const CameraRig: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle floating camera parallax based on mouse
    const mx = state.pointer.x * 0.35;
    const my = state.pointer.y * 0.25;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mx, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, my, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, -mx * 0.04, 0.05);
  });

  return (
    <group ref={groupRef}>
      <WallRibs />
      <ReflectiveFloor />
      <LaserHorizon />
      <Typography3D />
    </group>
  );
};

// ===========================================================================
// 6. MASTER 3D SCENE EXPORT
// ===========================================================================
export const Act2Scene3D: React.FC = () => {
  return (
    <div className="act2-scene-3d-wrap absolute inset-0 z-20 w-full h-full pointer-events-none select-none overflow-hidden bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 8.8], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        className="w-full h-full block pointer-events-none"
      >
        {/* Deep Cinematic Atmosphere Lighting */}
        <ambientLight color="#121418" intensity={0.8} />

        {/* Grazing Key Light for Right Architectural Wall */}
        <directionalLight
          position={[7.0, 3.5, 5.0]}
          color="#ffffff"
          intensity={2.4}
        />

        {/* Warm Golden Emissive Accent Light */}
        <pointLight
          position={[1.5, -0.3, 2.0]}
          color="#ecd08e"
          intensity={1.8}
          distance={12}
        />

        {/* Scene Rig */}
        <CameraRig />
      </Canvas>
    </div>
  );
};
