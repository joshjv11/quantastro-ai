import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor?: "gold" | "purple";
}

const InsightCard = ({ icon: Icon, title, description, accentColor = "gold" }: InsightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-4 flex flex-col gap-2 ${
        accentColor === "gold" ? "glass-card-gold" : ""
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        accentColor === "gold"
          ? "bg-primary/10"
          : "bg-accent/10"
      }`}>
        <Icon className={`w-5 h-5 ${
          accentColor === "gold" ? "text-primary" : "text-accent"
        }`} />
      </div>
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default InsightCard;
