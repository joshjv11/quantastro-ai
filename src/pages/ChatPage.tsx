import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string> = {
  default: "I sense your curiosity, dear seeker. Based on your current planetary alignment, this is a time for introspection and growth. The stars reveal that patience will be your greatest ally. 🌟",
  sad: "I notice your Moon is currently transiting the 8th house. This causes emotional depth but also heaviness. Try the Sound Therapy module to balance this energy. Remember, this transit is temporary — brighter days align with Jupiter's upcoming shift. 🌙",
  love: "Venus is currently in your 7th house, which governs partnerships. This is a powerful time for deepening connections. Be open and vulnerable — the cosmos supports authentic bonds right now. 💫",
  career: "Mercury aligns favorably with your 10th house of career. Communication is your superpower this week. Present ideas boldly, and don't shy away from negotiations. Saturn rewards persistence. ⚡",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("sad") || lower.includes("depress") || lower.includes("unhappy")) return mockResponses.sad;
  if (lower.includes("love") || lower.includes("relationship") || lower.includes("partner")) return mockResponses.love;
  if (lower.includes("career") || lower.includes("job") || lower.includes("work")) return mockResponses.career;
  return mockResponses.default;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "🙏 Namaste, dear seeker. I am your Vedic Life Guide. Ask me anything about your destiny, relationships, or spiritual path." },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const send = () => {
    if (!input.trim() || isThinking) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(userMsg) }]);
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)]">
        <div className="px-5 pt-10 pb-3">
          <h1 className="text-2xl font-serif text-gradient-cosmic">Vedic Guide</h1>
          <p className="text-xs text-muted-foreground mt-1">AI-powered spiritual intelligence</p>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 space-y-3 pb-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "glass-card-gold text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-muted-foreground text-xs"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              Analyzing your cosmic chart...
            </motion.div>
          )}
        </div>

        <div className="px-5 pb-4">
          <div className="glass-card flex items-center gap-2 p-2 pl-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask the stars..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={send}
              disabled={!input.trim() || isThinking}
              className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
