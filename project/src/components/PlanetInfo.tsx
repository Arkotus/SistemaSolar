import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PlanetData {
  name: string;
  description: string;
  diameter: string;
  dayLength: string;
  yearLength: string;
  temperature: string;
}

const planetData: PlanetData[] = [
  {
    name: "Sol",
    description: "La estrella central de nuestro sistema solar, una esfera de gas caliente que proporciona luz y calor a todos los planetas.",
    diameter: "1.392.700 km",
    dayLength: "27 días terrestres (en el ecuador)",
    yearLength: "225-250 millones de años (órbita galáctica)",
    temperature: "5.500°C (superficie)"
  },
  {
    name: "Mercurio",
    description: "El planeta más pequeño y más cercano al Sol, con una superficie llena de cráteres similar a la Luna.  En coche, este trayecto nos llevaría 55 años; en una nave espacial, unos 250 días. La luz lo recorre en 3 minutos y 18 segundos. (Igual que lo que tardamos andando, a la velocidad de la luz). ",
    diameter: "4.879 km",
    dayLength: "176 días terrestres",
    yearLength: "88 días terrestres",
    temperature: "-180°C a 430°C"
  },
  {
    name: "Venus",
    description: "A menudo llamado el gemelo de la Tierra por su tamaño similar, pero con una atmósfera densa y tóxica.",
    diameter: "12.104 km",
    dayLength: "243 días terrestres",
    yearLength: "225 días terrestres",
    temperature: "462°C (promedio)"
  },
  {
    name: "Tierra",
    description: "Nuestro hogar, el único planeta conocido que alberga vida, con una atmósfera rica en oxígeno y grandes océanos de agua líquida.",
    diameter: "12.742 km",
    dayLength: "24 horas",
    yearLength: "365.25 días",
    temperature: "15°C (promedio)"
  },
  {
    name: "Marte",
    description: "El planeta rojo, con casquetes polares y evidencia de agua líquida en el pasado.",
    diameter: "6.779 km",
    dayLength: "24 horas y 37 minutos",
    yearLength: "687 días terrestres",
    temperature: "-63°C (promedio)"
  },
  {
    name: "Júpiter",
    description: "El planeta más grande del sistema solar, un gigante gaseoso con una gran mancha roja y numerosas lunas.",
    diameter: "139.820 km",
    dayLength: "10 horas",
    yearLength: "11.9 años terrestres",
    temperature: "-110°C (tope de nubes)"
  },
  {
    name: "Saturno",
    description: "Famoso por sus espectaculares anillos, es un gigante gaseoso con una densidad menor que el agua.",
    diameter: "116.460 km",
    dayLength: "10.7 horas",
    yearLength: "29.5 años terrestres",
    temperature: "-140°C (tope de nubes)"
  },
  {
    name: "Urano",
    description: "Un gigante de hielo que gira de lado, con anillos tenues y un color azul verdoso distintivo.",
    diameter: "50.724 km",
    dayLength: "17 horas",
    yearLength: "84 años terrestres",
    temperature: "-195°C (tope de nubes)"
  },
  {
    name: "Neptuno",
    description: "El planeta más ventoso, con vientos que superan los 2.000 km/h, y el más lejano al Sol.",
    diameter: "49.244 km",
    dayLength: "16 horas",
    yearLength: "165 años terrestres",
    temperature: "-200°C (tope de nubes)"
  }
];

export function PlanetInfo() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData>(planetData[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 w-80 bg-black/70 backdrop-blur-sm text-white rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{selectedPlanet.name}</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </div>
      
      {isOpen && (
        <div className="border-t border-white/20">
          <div className="max-h-96 overflow-y-auto">
            {planetData.map((planet) => (
              <div
                key={planet.name}
                className={`p-4 cursor-pointer hover:bg-white/10 transition-colors ${
                  selectedPlanet.name === planet.name ? 'bg-white/20' : ''
                }`}
                onClick={() => {
                  setSelectedPlanet(planet);
                  setIsOpen(false);
                }}
              >
                {planet.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-white/20">
        <p className="text-sm mb-4">{selectedPlanet.description}</p>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-400">Diámetro:</span> {selectedPlanet.diameter}
          </div>
          <div>
            <span className="text-gray-400">Duración del día:</span> {selectedPlanet.dayLength}
          </div>
          <div>
            <span className="text-gray-400">Duración del año:</span> {selectedPlanet.yearLength}
          </div>
          <div>
            <span className="text-gray-400">Temperatura:</span> {selectedPlanet.temperature}
          </div>
        </div>
      </div>
    </div>
  );
}