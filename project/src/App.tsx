import React from 'react';
import { SolarSystem } from './components/SolarSystem';
import { Info } from 'lucide-react';
import { PlanetInfo } from './components/PlanetInfo';

function App() {
  return (
    <div className="w-full h-screen bg-black relative">
      <SolarSystem />
      
      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <Info size={20} />
          <h1 className="text-xl font-bold">Sistema Solar 3D</h1>
        </div>
        <p className="text-sm opacity-80">
          Usa el mouse para rotar la vista. Rueda del mouse para zoom. 
          Arrastra con el botón derecho para mover la cámara.
        </p>
      </div>

      <PlanetInfo />
    </div>
  );
}

export default App;