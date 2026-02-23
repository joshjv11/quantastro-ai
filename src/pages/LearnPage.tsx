import { useState } from "react";
import { Play, Pause, Heart, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";

const mantras = [
  { id: 1, title: "Om Chanting", subtitle: "Universal Healing", duration: "10 min", color: "from-primary to-cosmic-purple" },
  { id: 2, title: "Stress Relief", subtitle: "Calming Vibrations", duration: "5 min", color: "from-cosmic-purple to-primary" },
  { id: 3, title: "Chakra Balance", subtitle: "Energy Alignment", duration: "15 min", color: "from-primary to-gold-dim" },
  { id: 4, title: "Sleep Sounds", subtitle: "Deep Rest", duration: "20 min", color: "from-cosmic-purple-dim to-cosmic-purple" },
  { id: 5, title: "Morning Mantra", subtitle: "Awaken Energy", duration: "7 min", color: "from-primary to-cosmic-purple" },
];

const tabs = ["Mantras", "Stories", "Courses"];

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState("Mantras");
  const [healingMode, setHealingMode] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFav = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  return (
    <AppLayout>
      <div className="px-5 pt-10 space-y-5">
        <h1 className="text-2xl font-serif text-gradient-cosmic">Learn & Heal</h1>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Mantra List */}
        {activeTab === "Mantras" && (
          <div className="space-y-3">
            {mantras.map((mantra, i) => (
              <motion.div
                key={mantra.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <button
                  onClick={() => { setHealingMode(mantra.id); setIsPlaying(true); }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mantra.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{mantra.title}</h3>
                  <p className="text-xs text-muted-foreground">{mantra.subtitle}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {mantra.duration}
                  </div>
                  <button onClick={() => toggleFav(mantra.id)}>
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        favorites.includes(mantra.id)
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "Stories" && (
          <div className="glass-card p-6 text-center space-y-2">
            <p className="text-muted-foreground text-sm">Ancient wisdom stories coming soon...</p>
          </div>
        )}

        {activeTab === "Courses" && (
          <div className="glass-card p-6 text-center space-y-2">
            <p className="text-muted-foreground text-sm">Vedic courses coming soon...</p>
          </div>
        )}
      </div>

      {/* Healing Mode Overlay */}
      <AnimatePresence>
        {healingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex flex-col items-center justify-center gap-8 p-8"
          >
            <button
              onClick={() => { setHealingMode(null); setIsPlaying(false); }}
              className="absolute top-6 right-6 text-muted-foreground text-sm"
            >
              Close ✕
            </button>

            <h2 className="font-serif text-xl text-gradient-gold">
              {mantras.find((m) => m.id === healingMode)?.title}
            </h2>

            {/* Pulsing Orb */}
            <div className="relative w-40 h-40">
              <motion.div
                animate={{
                  scale: isPlaying ? [1, 1.2, 1] : 1,
                  opacity: isPlaying ? [0.6, 1, 0.6] : 0.4,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-cosmic-purple glow-gold"
              />
              <motion.div
                animate={{
                  scale: isPlaying ? [1.1, 1.4, 1.1] : 1.1,
                  opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.1,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-primary/30 to-cosmic-purple/30"
              />
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground glow-gold"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>

            <p className="text-xs text-muted-foreground">
              {isPlaying ? "Healing in progress..." : "Tap to begin"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default LearnPage;
