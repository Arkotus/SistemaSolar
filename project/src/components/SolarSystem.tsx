import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Planet } from './Planet';
import { PlanetLabel } from './PlanetLabel';
import { DetailedView } from './DetailedView';
import { useRef, useState } from 'react';

const PLANET_DATA = {
  Sol: { color: '#ff9900', size: 2.5 },
  Mercurio: { color: '#c4c4c4', size: 0.4 },
  Venus: { color: '#e6b800', size: 0.6 },
  Tierra: { color: '#4169e1', size: 0.7 },
  Marte: { color: '#ff4d4d', size: 0.5 },
  Júpiter: { color: '#ffa500', size: 1.5 },
  Saturno: { color: '#deb887', size: 1.3 },
  Urano: { color: '#add8e6', size: 0.9 },
  Neptuno: { color: '#0000cd', size: 0.8 }
};

function AnimatedStars() {
  const starsRef = useRef(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

export function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const handlePlanetSelect = (name: string) => {
    setSelectedPlanet(name);
  };

  return (
    <Canvas camera={{ position: [0, 20, 35], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fff" />
      <AnimatedStars />
      
      {/* Sun */}
      <mesh
        position={[0, 0, 0]}
        onClick={() => handlePlanetSelect('Sol')}
      >
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial emissive="#ffff00" emissiveIntensity={2} color="#ff9900" />
        <PlanetLabel name="Sol" />
      </mesh>
      
      {/* Planets */}
      <Planet position={[0, 0, 0]} size={0.4} color="#c4c4c4" orbitSpeed={1.6} rotationSpeed={0.02} orbitRadius={4} name="Mercurio" onSelect={handlePlanetSelect} />
      <Planet position={[0, 0, 0]} size={0.6} color="#e6b800" orbitSpeed={1.2} rotationSpeed={0.015} orbitRadius={6} name="Venus" onSelect={handlePlanetSelect} />
      <Planet position={[0, 0, 0]} size={0.7} color="#4169e1" orbitSpeed={1} rotationSpeed={0.01} orbitRadius={8} name="Tierra" onSelect={handlePlanetSelect} />
      <Planet position={[0, 0, 0]} size={0.5} color="#ff4d4d" orbitSpeed={0.8} rotationSpeed={0.012} orbitRadius={10} name="Marte" onSelect={handlePlanetSelect} />
      <Planet position={[0, 0, 0]} size={1.5} color="#ffa500" orbitSpeed={0.4} rotationSpeed={0.008} orbitRadius={14} name="Júpiter" onSelect={handlePlanetSelect} />
      <Planet position={[0, 0, 0]} size={1.3} color="#deb887" orbitSpeed={0.3} rotationSpeed={0.009} orbitRadius={18} name="Saturno" onSelect={handlePlanetSelect} />
      <Planet position={[0, 0, 0]} size={0.9} color="#add8e6" orbitSpeed={0.2} rotationSpeed={0.007} orbitRadius={22} name="Urano" onSelect={handlePlanetSelect} />
      <Planet position={[0, 0, 0]} size={0.8} color="#0000cd" orbitSpeed={0.1} rotationSpeed={0.006} orbitRadius={26} name="Neptuno" onSelect={handlePlanetSelect} />
      
      {selectedPlanet && (
        <DetailedView
          name={selectedPlanet}
          color={PLANET_DATA[selectedPlanet].color}
          size={PLANET_DATA[selectedPlanet].size * 2}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}