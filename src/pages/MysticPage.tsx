import { useState, useCallback } from "react";
import { Sparkles, RotateCcw, Eye, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { tarotDeck, akashicReadings, shuffleArray, getRandomItem, type TarotCard, type AkashicReading } from "@/lib/mockData";

// ─── Tarot Tab ───────────────────────────────────────
function TarotTab() {
  const [deck, setDeck] = useState<TarotCard[]>(tarotDeck);
  const [picked, setPicked] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  const shuffle = useCallback(() => {
    setShuffling(true);
    setPicked([]);
    setFlipped(new Set());
    setRevealed(false);
    setTimeout(() => {
      setDeck(shuffleArray(tarotDeck));
      setShuffling(false);
    }, 800);
  }, []);

  const pickCard = (idx: number) => {
    if (picked.length >= 3 || picked.includes(idx)) return;
    const next = [...picked, idx];
    setPicked(next);
    setTimeout(() => setFlipped((prev) => new Set(prev).add(idx)), 300);
  };

  const labels = ["Past", "Present", "Future"];

  return (
    <div className="space-y-5">
      {/* Deck */}
      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={shuffle}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold flex items-center gap-2 glow-gold"
        >
          <RotateCcw className={`w-4 h-4 ${shuffling ? "animate-spin" : ""}`} />
          Shuffle Deck
        </motion.button>
      </div>

      {/* Fan of cards */}
      <div className="relative h-52 flex items-center justify-center">
        {deck.slice(0, 7).map((card, i) => {
          const isSelected = picked.includes(i);
          const isFlippedCard = flipped.has(i);
          const angle = (i - 3) * 8;
          const translateY = Math.abs(i - 3) * 6;

          return (
            <motion.div
              key={card.id}
              onClick={() => pickCard(i)}
              animate={{
                rotate: shuffling ? [0, 10, -10, 0] : angle,
                y: isSelected ? -30 : translateY,
                scale: isSelected ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute cursor-pointer"
              style={{ zIndex: isSelected ? 20 : 10 - Math.abs(i - 3) }}
            >
              <div className="relative w-20 h-32" style={{ perspective: "600px" }}>
                <motion.div
                  animate={{ rotateY: isFlippedCard ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Card Back */}
                  <div
                    className="absolute inset-0 rounded-xl border border-primary/30 bg-gradient-to-br from-cosmic-surface to-cosmic-bg flex items-center justify-center glow-gold"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  {/* Card Front */}
                  <div
                    className="absolute inset-0 rounded-xl border border-primary/40 bg-gradient-to-br from-cosmic-surface-light to-cosmic-surface flex flex-col items-center justify-center gap-1 p-2"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <span className="text-2xl">{card.image}</span>
                    <span className="text-[9px] text-center text-foreground font-semibold leading-tight">{card.name}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Picked cards labels */}
      {picked.length > 0 && (
        <div className="flex justify-center gap-6">
          {picked.map((idx, pos) => (
            <div key={idx} className="text-center space-y-1">
              <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">{labels[pos]}</p>
              <p className="text-xs text-foreground">{deck[idx].name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reveal button */}
      {picked.length === 3 && !revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <button
            onClick={() => setRevealed(true)}
            className="px-6 py-3 rounded-xl glass-card-gold text-primary text-sm font-semibold flex items-center gap-2 glow-gold"
          >
            <Eye className="w-4 h-4" />
            Reveal Interpretation
          </button>
        </motion.div>
      )}

      {/* Interpretation */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-gold p-5 space-y-4"
          >
            <h3 className="font-serif text-lg text-gradient-gold">Your Reading</h3>
            {picked.map((idx, pos) => (
              <div key={idx} className="space-y-1 border-b border-border/20 pb-3 last:border-0 last:pb-0">
                <p className="text-xs text-primary font-semibold">{labels[pos]} — {deck[idx].name} {deck[idx].image}</p>
                <p className="text-sm text-foreground leading-relaxed">{deck[idx].meaning}</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground italic pt-2">
              The cards suggest a major transition ahead. Trust the cosmic flow and embrace transformation with an open heart. ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Akashic Tab ─────────────────────────────────────
function AkashicTab() {
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<AkashicReading | null>(null);
  const [loadingText, setLoadingText] = useState("");

  const accessRecords = () => {
    setLoading(true);
    setReading(null);
    const texts = [
      "Connecting to Universal Energy...",
      "Deciphering Past Life Patterns...",
      "Accessing Akashic Library...",
      "Soul Records Found...",
    ];
    texts.forEach((t, i) => setTimeout(() => setLoadingText(t), i * 1200));
    setTimeout(() => {
      setLoading(false);
      setReading(getRandomItem(akashicReadings));
    }, texts.length * 1200);
  };

  return (
    <div className="space-y-6">
      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-primary glow-purple"
            />
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-foreground font-serif"
            >
              {loadingText}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro */}
      {!reading && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6 py-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary/30 to-primary/20 flex items-center justify-center glow-purple">
            <BookOpen className="w-10 h-10 text-secondary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-serif text-lg text-foreground">The Akashic Records</h3>
            <p className="text-xs text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
              Access the universal library that holds every soul's journey across lifetimes.
            </p>
          </div>
          <button
            onClick={accessRecords}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-secondary to-primary text-primary-foreground text-sm font-semibold glow-purple"
          >
            ✨ Access Soul Records
          </button>
        </motion.div>
      )}

      {/* Result — scroll container */}
      {reading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass-card-gold p-5 space-y-4 border-primary/20">
            <div className="text-center space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Soul Record Revealed</p>
              <h3 className="font-serif text-xl text-gradient-gold">{reading.pastLifeRole}</h3>
              <p className="text-xs text-secondary">{reading.era}</p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { label: "Karmic Lesson", value: reading.karmicLesson },
                { label: "Soul Purpose", value: reading.soulPurpose },
                { label: "Soul Gift", value: reading.soulGift },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border/20">
              <p className="text-xs text-muted-foreground italic leading-relaxed">"{reading.guidance}"</p>
            </div>
          </div>

          <button
            onClick={accessRecords}
            className="w-full py-3 rounded-xl glass-card text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Read Another Lifetime →
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────
const MysticPage = () => {
  return (
    <AppLayout>
      <div className="px-5 pt-10 space-y-5">
        <h1 className="text-2xl font-serif text-gradient-cosmic">Mystic Portal</h1>

        <Tabs defaultValue="tarot" className="w-full">
          <TabsList className="w-full bg-muted/50 border border-border/30">
            <TabsTrigger value="tarot" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              🃏 Tarot
            </TabsTrigger>
            <TabsTrigger value="akashic" className="flex-1 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
              📜 Akashic Records
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tarot">
            <TarotTab />
          </TabsContent>
          <TabsContent value="akashic">
            <AkashicTab />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MysticPage;
