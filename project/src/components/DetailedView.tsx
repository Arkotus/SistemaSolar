import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { X } from 'lucide-react';
import * as THREE from 'three';

interface Satellite {
  name: string;
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
}

interface DetailedViewProps {
  name: string;
  color: string;
  size: number;
  onClose: () => void;
}

const SATELLITES: Record<string, Satellite[]> = {
  "Tierra": [
    { name: "Luna", size: 0.15, color: "#CCCCCC", orbitRadius: 3, orbitSpeed: 0.5 }
  ],
  "Marte": [
    { name: "Fobos", size: 0.08, color: "#A0522D", orbitRadius: 2.8, orbitSpeed: 0.6 },
    { name: "Deimos", size: 0.06, color: "#8B4513", orbitRadius: 3.5, orbitSpeed: 0.4 }
  ],
  "Júpiter": [
    { name: "Ío", size: 0.2, color: "#FFD700", orbitRadius: 3.5, orbitSpeed: 0.7 },
    { name: "Europa", size: 0.18, color: "#F5F5DC", orbitRadius: 4.2, orbitSpeed: 0.5 },
    { name: "Ganímedes", size: 0.25, color: "#D2B48C", orbitRadius: 5, orbitSpeed: 0.4 },
    { name: "Calisto", size: 0.23, color: "#A0522D", orbitRadius: 5.8, orbitSpeed: 0.3 }
  ],
  "Saturno": [
    { name: "Titán", size: 0.3, color: "#FFA500", orbitRadius: 4, orbitSpeed: 0.4 },
    { name: "Encélado", size: 0.15, color: "#F0FFFF", orbitRadius: 3.2, orbitSpeed: 0.6 }
  ],
  "Urano": [
    { name: "Titania", size: 0.15, color: "#E6E6FA", orbitRadius: 3.2, orbitSpeed: 0.5 },
    { name: "Oberón", size: 0.14, color: "#D3D3D3", orbitRadius: 4, orbitSpeed: 0.4 }
  ],
  "Neptuno": [
    { name: "Tritón", size: 0.2, color: "#B0E0E6", orbitRadius: 3.4, orbitSpeed: 0.45 }
  ]
};

function SaturnRings({ size }: { size: number }) {
  const ringsRef = useRef(null);
  
  useFrame(({ clock }) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.PI / 3; // Inclinación de los anillos
    }
  });

  return (
    <group ref={ringsRef}>
      {/* Anillo principal */}
      <mesh>
        <torusGeometry args={[size * 1.6, size * 0.4, 2, 100]} />
        <meshStandardMaterial
          color="#deb887"
          transparent={true}
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Anillo exterior más tenue */}
      <mesh>
        <torusGeometry args={[size * 2, size * 0.2, 2, 100]} />
        <meshStandardMaterial
          color="#c4a484"
          transparent={true}
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Anillo interior más oscuro */}
      <mesh>
        <torusGeometry args={[size * 1.3, size * 0.3, 2, 100]} />
        <meshStandardMaterial
          color="#8b7355"
          transparent={true}
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Satellite({ satellite, time }: { satellite: Satellite; time: number }) {
  const { size, color, orbitRadius, orbitSpeed, name } = satellite;
  const position = [
    Math.cos(time * orbitSpeed) * orbitRadius,
    0,
    Math.sin(time * orbitSpeed) * orbitRadius
  ];

  return (
    <group position={position as [number, number, number]}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html center position={[0, size + 0.3, 0]}>
        <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs whitespace-nowrap">
          {name}
        </div>
      </Html>
    </group>
  );
}

export function DetailedView({ name, color, size, onClose }: DetailedViewProps) {
  const meshRef = useRef(null);
  const satellites = SATELLITES[name] || [];

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={[0, 0, -10]}>
      <Html position={[0, size * 2, 0]}>
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg text-white w-64">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">{name}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          {satellites.length > 0 && (
            <p className="text-sm opacity-80">
              Satélites principales: {satellites.map(s => s.name).join(', ')}
            </p>
          )}
        </div>
      </Html>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
      
      {/* Anillos de Saturno */}
      {name === "Saturno" && <SaturnRings size={size} />}
      
      {/* Render satellites */}
      {satellites.map((satellite, index) => (
        <Satellite
          key={satellite.name}
          satellite={satellite}
          time={performance.now() * 0.001}
        />
      ))}
    </group>
  );
}