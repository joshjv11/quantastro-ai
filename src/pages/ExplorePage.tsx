import { useState } from "react";
import { HeartHandshake, Home, Sparkles, Briefcase, Apple, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { lifeAdvice, getRandomItem, type LifeAdvice } from "@/lib/mockData";

const areas = [
  { key: "love", icon: HeartHandshake, title: "Love & Relationships", subtitle: "Compatibility & patterns", gradient: "from-pink-500/20 to-secondary/20" },
  { key: "family", icon: Home, title: "Family & Home", subtitle: "Domestic harmony", gradient: "from-blue-500/20 to-secondary/20" },
  { key: "fashion", icon: Sparkles, title: "Astro-Styling", subtitle: "Colors & clothing for luck", gradient: "from-primary/20 to-amber-500/20" },
  { key: "career", icon: Briefcase, title: "Career & Wealth", subtitle: "Success timing", gradient: "from-emerald-500/20 to-secondary/20" },
  { key: "health", icon: Apple, title: "Health & Diet", subtitle: "Vedic nutrition", gradient: "from-green-500/20 to-primary/20" },
] as const;

const MysticPage = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [advice, setAdvice] = useState<LifeAdvice | null>(null);

  const openArea = (key: string) => {
    setAdvice(getRandomItem(lifeAdvice[key]));
    setActiveArea(key);
  };

  const area = areas.find((a) => a.key === activeArea);

  return (
    <AppLayout>
      <div className="px-5 pt-10 space-y-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-serif text-gradient-cosmic">Life Areas</h1>
          <p className="text-xs text-muted-foreground">Optimize your lifestyle based on your stars</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {areas.map((item, i) => (
            <motion.button
              key={item.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openArea(item.key)}
              className={`glass-card p-4 text-left space-y-3 transition-all hover:border-primary/30 ${
                item.key === "fashion" ? "col-span-2" : ""
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <item.icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {activeArea && advice && area && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={() => setActiveArea(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-primary/20 bg-background"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted" />
              </div>

              <div className="px-6 pb-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center`}>
                      <area.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg text-foreground">{area.title}</h2>
                      <p className="text-[10px] text-muted-foreground">{area.subtitle}</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveArea(null)} className="text-muted-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Advice content */}
                <div className="glass-card-gold p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-primary">{advice.title}</h3>
                  <div className="space-y-2.5">
                    {advice.details.map((detail, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="text-primary text-xs mt-0.5">✦</span>
                        <p className="text-sm text-foreground leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fashion-specific lookbook */}
                {activeArea === "fashion" && (
                  <div className="space-y-4">
                    <div className="glass-card p-5 space-y-3">
                      <h3 className="font-serif text-base text-gradient-gold">Your Look Today</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass-card p-3 text-center space-y-2">
                          <span className="text-2xl">👗</span>
                          <p className="text-[10px] text-muted-foreground">Outfit Style</p>
                          <p className="text-xs font-semibold text-foreground">Elegant Minimalist</p>
                        </div>
                        <div className="glass-card p-3 text-center space-y-2">
                          <span className="text-2xl">💎</span>
                          <p className="text-[10px] text-muted-foreground">Accessory</p>
                          <p className="text-xs font-semibold text-foreground">Pearl & Silver</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-5 space-y-3">
                      <h3 className="font-serif text-base text-gradient-gold">Scent of the Day</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">🕯️</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Sandalwood & Jasmine</p>
                          <p className="text-xs text-muted-foreground">Calms Mars energy & attracts Venus blessings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => openArea(activeArea!)}
                  className="w-full py-3 rounded-xl glass-card text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Refresh Reading →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default MysticPage;
