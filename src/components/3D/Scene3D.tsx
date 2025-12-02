import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ParticleSystem } from './ParticleSystem';
import { AnimatedLogo } from './AnimatedLogo';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

interface Scene3DProps {
  children?: React.ReactNode;
  enableControls?: boolean;
  showLogo?: boolean;
  showParticles?: boolean;
  cameraPosition?: [number, number, number];
}

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  </div>
);

export const Scene3D: React.FC<Scene3DProps> = ({
  children,
  enableControls = false,
  showLogo = false,
  showParticles = false,
  cameraPosition = [0, 0, 5]
}) => {
  const mouse = useRef<[number, number]>([0, 0]);
  const { isDarkMode } = useStore();

  const handleMouseMove = (event: React.MouseEvent) => {
    mouse.current = [
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    ];
  };

  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove}>
      <Canvas
        shadows
        camera={{ 
          position: cameraPosition, 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={isDarkMode ? 0.2 : 0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={isDarkMode ? 0.8 : 1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} color="#F78305" intensity={isDarkMode ? 0.5 : 0.3} />

          {/* Environment */}
          <Environment preset={isDarkMode ? "night" : "city"} />
          <ContactShadows opacity={0.4} scale={10} blur={1} far={10} resolution={256} />

          {/* Conditional 3D elements */}
          {showParticles && <ParticleSystem mouse={mouse} count={300} />}
          {showLogo && <AnimatedLogo />}

          {/* Custom children */}
          {children}

          {/* Controls */}
          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};