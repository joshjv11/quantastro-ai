import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import * as THREE from "three";

const planets = [
  { name: "Sun", color: "#FFD700", house: "1st House", impact: "Leadership Energy", suggestion: "Good day to take initiative and lead." },
  { name: "Moon", color: "#C0C0C0", house: "4th House", impact: "Emotional Balance", suggestion: "Connect with family and nurture yourself." },
  { name: "Mars", color: "#FF4500", house: "5th House", impact: "High Energy", suggestion: "Good for sports and physical activities." },
  { name: "Jupiter", color: "#DAA520", house: "9th House", impact: "Expansion", suggestion: "Pursue learning and spiritual growth today." },
  { name: "Saturn", color: "#708090", house: "10th House", impact: "Discipline", suggestion: "Focus on long-term career goals." },
];

function Planet({ color }: { color: string }) {
  return (
    <group>
      {/* Planet sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      {/* Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.08, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[2.6, 0.04, 16, 100]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

const CosmicPage = () => {
  const [selected, setSelected] = useState(0);

  return (
    <AppLayout>
      <div className="px-5 pt-10 space-y-4">
        <h1 className="text-2xl font-serif text-gradient-cosmic">Cosmic View</h1>

        {/* 3D Viewer */}
        <div className="glass-card rounded-2xl overflow-hidden h-[300px] relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color={planets[selected].color} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <Suspense fallback={null}>
              <Planet color={planets[selected].color} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="text-xs text-muted-foreground">Drag to rotate</span>
          </div>
        </div>

        {/* Planet Cards */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {planets.map((planet, i) => (
            <button
              key={planet.name}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selected === i
                  ? "glass-card-gold text-primary glow-gold"
                  : "glass-card text-muted-foreground"
              }`}
            >
              {planet.name}
            </button>
          ))}
        </div>

        {/* Planet Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card-gold p-5 space-y-3"
          >
            <h2 className="font-serif text-lg text-gradient-gold">{planets[selected].name}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Current House</p>
                <p className="text-sm font-semibold text-foreground">{planets[selected].house}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Impact</p>
                <p className="text-sm font-semibold text-primary">{planets[selected].impact}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground">Suggestion</p>
              <p className="text-sm text-foreground mt-1">{planets[selected].suggestion}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default CosmicPage;
