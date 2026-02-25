import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ExplorePage from "./pages/ExplorePage";
import MysticPage from "./pages/MysticPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import OnboardingPage from "./pages/OnboardingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const onboarded = localStorage.getItem("quantastro_onboarded");
  if (!onboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/" element={<OnboardingGuard><Index /></OnboardingGuard>} />
          <Route path="/explore" element={<OnboardingGuard><ExplorePage /></OnboardingGuard>} />
          <Route path="/mystic" element={<OnboardingGuard><MysticPage /></OnboardingGuard>} />
          <Route path="/chat" element={<OnboardingGuard><ChatPage /></OnboardingGuard>} />
          <Route path="/profile" element={<OnboardingGuard><ProfilePage /></OnboardingGuard>} />
          {/* Legacy redirects */}
          <Route path="/cosmic" element={<Navigate to="/explore" replace />} />
          <Route path="/learn" element={<Navigate to="/mystic" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
