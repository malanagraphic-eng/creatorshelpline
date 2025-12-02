import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

interface ParticleSystemProps {
  count?: number;
  mouse?: React.MutableRefObject<[number, number]>;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  count = 500,
  mouse 
}) => {
  const ref = useRef<THREE.Points>(null);
  const { size } = useThree();
  const { isDarkMode } = useStore();

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      if (isDarkMode) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.3;
        colors[i * 3 + 2] = 0;
      } else {
        colors[i * 3] = Math.random();
        colors[i * 3 + 1] = Math.random() * 0.5;
        colors[i * 3 + 2] = 0;
      }
    }

    return [positions, colors];
  }, [count, isDarkMode]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      ref.current.rotation.x = time * 0.05;
      ref.current.rotation.y = time * 0.075;

      if (mouse) {
        ref.current.rotation.x += mouse.current[1] * 0.0001;
        ref.current.rotation.y += mouse.current[0] * 0.0001;
      }
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={isDarkMode ? "#F78305" : "#F78305"}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};