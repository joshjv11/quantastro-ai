import { User, Star, Moon, Sun, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("quantastro_name") || "Seeker";
  const dob = localStorage.getItem("quantastro_dob") || "Not set";
  const place = localStorage.getItem("quantastro_place") || "Not set";

  return (
    <AppLayout>
      <div className="px-5 pt-10 space-y-6">
        <h1 className="text-2xl font-serif text-gradient-cosmic">Profile</h1>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cosmic-purple flex items-center justify-center glow-gold">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-serif text-foreground">{name}</h2>
        </motion.div>

        {/* Birth Info */}
        <div className="glass-card-gold p-5 space-y-4">
          <h3 className="text-sm font-semibold text-primary">Birth Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Date of Birth</p>
              <p className="text-sm text-foreground">{dob}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Birth Place</p>
              <p className="text-sm text-foreground">{place}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Sun, label: "Sun Sign", value: "Leo" },
            { icon: Moon, label: "Moon Sign", value: "Pisces" },
            { icon: Star, label: "Rising", value: "Scorpio" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card p-3 text-center space-y-2"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto" />
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="text-xs font-semibold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Restart */}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/onboarding");
          }}
          className="w-full glass-card p-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Reset & Re-onboard
        </button>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
