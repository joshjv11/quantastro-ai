import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const loadingTexts = [
  "Aligning Stars...",
  "Calculating Dashas...",
  "Reading Akashic Records...",
  "Destiny Map Ready ✨",
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"welcome" | "form" | "loading">("welcome");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [place, setPlace] = useState("");
  const [gender, setGender] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(0);

  const startLoading = () => {
    localStorage.setItem("quantastro_name", name);
    localStorage.setItem("quantastro_dob", dob);
    localStorage.setItem("quantastro_place", place);
    localStorage.setItem("quantastro_onboarded", "true");
    setStep("loading");

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx >= loadingTexts.length) {
        clearInterval(interval);
        setTimeout(() => navigate("/"), 800);
      } else {
        setLoadingIndex(idx);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background starfield flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-8 max-w-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-cosmic-purple mx-auto flex items-center justify-center glow-gold"
            >
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-3xl font-serif text-gradient-gold">Quantastro AI</h1>
              <p className="text-muted-foreground text-sm">Your Personal Life Guide</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setStep("form")}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm text-primary-foreground bg-gradient-to-r from-primary to-cosmic-purple glow-gold"
              >
                Get Started
              </button>
              <button className="w-full py-3.5 rounded-2xl font-semibold text-sm text-muted-foreground glass-card">
                Login
              </button>
            </div>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="w-full max-w-sm space-y-5"
          >
            <div className="space-y-1">
              <h1 className="text-2xl font-serif text-gradient-gold">Your Birth Chart</h1>
              <p className="text-xs text-muted-foreground">We need your birth details to map your destiny</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Name", value: name, onChange: setName, type: "text", placeholder: "Your name" },
                { label: "Date of Birth", value: dob, onChange: setDob, type: "date", placeholder: "" },
                { label: "Time of Birth", value: timeOfBirth, onChange: setTimeOfBirth, type: "time", placeholder: "" },
                { label: "Place of Birth", value: place, onChange: setPlace, type: "text", placeholder: "City, Country" },
              ].map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <label className="text-xs text-muted-foreground font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full glass-card px-4 py-3 rounded-xl text-sm text-foreground bg-transparent placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
              ))}

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">Gender</label>
                <div className="flex gap-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        gender === g
                          ? "bg-primary text-primary-foreground"
                          : "glass-card text-muted-foreground"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={startLoading}
              disabled={!name || !dob}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm text-primary-foreground bg-gradient-to-r from-primary to-cosmic-purple glow-gold disabled:opacity-40 transition-opacity"
            >
              ✨ Generate My Life Map
            </button>
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 mx-auto rounded-full border-2 border-primary/30 border-t-primary glow-gold"
              style={{
                background: "radial-gradient(circle, hsl(270 76% 59% / 0.2) 0%, transparent 70%)",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.p
                key={loadingIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-primary font-medium"
              >
                {loadingTexts[loadingIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
