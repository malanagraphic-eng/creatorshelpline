import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, useTexture } from '@react-three/drei';
import { Project } from '../../types';
import * as THREE from 'three';

interface ProjectCard3DProps {
  project: Project;
  position: [number, number, number];
  onSelect: (project: Project) => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  position,
  onSelect
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      const targetRotation = clicked ? 0.2 : 0;
      
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 
        targetRotation, 
        0.1
      );
    }
  });

  const handleClick = () => {
    setClicked(!clicked);
    onSelect(project);
  };

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[2, 1.2, 0.1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={hovered ? "#F78305" : "#FFFFFF"}
          transparent
          opacity={0.9}
        />
      </Box>

      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.15}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        font="/fonts/coolvetica.woff"
      >
        {project.title}
      </Text>

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.08}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
      >
        {project.description}
      </Text>

      <Text
        position={[0, -0.3, 0.06]}
        fontSize={0.06}
        color="#F78305"
        anchorX="center"
        anchorY="middle"
      >
        {project.tags.join(' • ')}
      </Text>
    </group>
  );
};