import { Html } from '@react-three/drei';

interface PlanetLabelProps {
  name: string;
}

export function PlanetLabel({ name }: PlanetLabelProps) {
  return (
    <Html
      center
      position={[0, 2, 0]}
      style={{
        transform: 'translate3d(-50%, -50%, 0)',
        userSelect: 'none'
      }}
    >
      <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-sm whitespace-nowrap">
        {name}
      </div>
    </Html>
  );
}