import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { PlanetLabel } from './PlanetLabel';
import { Html } from '@react-three/drei';

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  orbitSpeed: number;
  rotationSpeed: number;
  orbitRadius: number;
  name: string;
  texture?: string;
  onSelect: (name: string) => void;
}

export function Planet({ position, size, color, orbitSpeed, rotationSpeed, orbitRadius, name, onSelect, texture }: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Rotation around own axis
    meshRef.current.rotation.y += rotationSpeed;
    
    // Orbital movement
    const time = clock.getElapsedTime();
    meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
    meshRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onSelect(name)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
      <PlanetLabel name={name} />
    </mesh>
  );
}