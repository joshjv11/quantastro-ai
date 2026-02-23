import { MessageCircle, Heart, Flower2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import EnergyCircle from "@/components/EnergyCircle";
import InsightCard from "@/components/InsightCard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("quantastro_name") || "Seeker";

  return (
    <AppLayout>
      <div className="px-5 pt-12 space-y-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <p className="text-muted-foreground text-sm">🙏 Namaste</p>
          <h1 className="text-2xl font-serif text-gradient-gold">{userName}</h1>
        </motion.div>

        {/* Energy Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card-gold p-6 flex items-center gap-6"
        >
          <EnergyCircle percentage={75} label="High Vibration" />
          <div className="flex-1 space-y-2">
            <h2 className="font-serif text-lg text-foreground">Today's Energy</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your cosmic alignment is strong today. Venus and Jupiter are favorably positioned for creativity and abundance.
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Sparkles
                  key={i}
                  className={`w-3.5 h-3.5 ${i <= 4 ? "text-primary" : "text-muted"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Insight Cards */}
        <div className="grid grid-cols-2 gap-3">
          <InsightCard
            icon={MessageCircle}
            title="AI Insight"
            description="Today avoid arguments. Focus on learning and inner growth."
            accentColor="purple"
          />
          <InsightCard
            icon={Heart}
            title="Relationship"
            description="Stable energy. Good day for heartfelt conversations."
            accentColor="gold"
          />
          <InsightCard
            icon={Flower2}
            title="Healing"
            description="5 min meditation recommended. Try the Sound Therapy module."
            accentColor="purple"
          />
          <InsightCard
            icon={Sparkles}
            title="Career"
            description="Mercury supports communication. Present your ideas boldly."
            accentColor="gold"
          />
        </div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/cosmic")}
          className="w-full py-4 rounded-2xl font-semibold text-sm text-primary-foreground bg-gradient-to-r from-primary to-cosmic-purple glow-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          ✨ View Planetary Alignments
        </motion.button>
      </div>
    </AppLayout>
  );
};

export default Index;
