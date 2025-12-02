import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

interface AnimatedLogoProps {
  position?: [number, number, number];
  scale?: number;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  position = [0, 0, 0], 
  scale = 1 
}) => {
  const logoRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const { isDarkMode } = useStore();

  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      logoRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  return (
    <group ref={logoRef} position={position} scale={scale}>
      <Text
        ref={textRef}
        fontSize={1.2}
        color={isDarkMode ? "#FFFFFF" : "#000000"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/coolvetica.woff"
        castShadow
        receiveShadow
      >
        CreatKaro
        <meshStandardMaterial attach="material" color={isDarkMode ? "#FFFFFF" : "#000000"} />
      </Text>
      
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.3}
        color="#F78305"
        anchorX="center"
        anchorY="middle"
        font="/fonts/coolvetica.woff"
      >
        AGENCY
        <meshStandardMaterial attach="material" color="#F78305" />
      </Text>

      {/* Decorative elements */}
      <mesh position={[-1.5, 0.2, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#F78305" />
      </mesh>
      
      <mesh position={[1.5, 0.2, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#F78305" />
      </mesh>
    </group>
  );
};