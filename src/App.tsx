import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import SOSButton from "./components/SOSButton";
import WelcomePopup from "./components/WelcomePopup";
import HealthChatbot from "./components/HealthChatbot";
import Home from "./pages/Home";
import Education from "./pages/Education";
import Healthcare from "./pages/Healthcare";
import Literacy from "./pages/Literacy";
import Emergency from "./pages/Emergency";
import Misconceptions from "./pages/Misconceptions";
import Dashboard from "./pages/Dashboard";
import AskDoctor from "./pages/AskDoctor";
import HealthLocator from "./pages/HealthLocator";
import NotFound from "./pages/NotFound";
import HealthTipsBanner from "./components/HealthTipsBanner";
import { useState } from "react";
import { Language } from "./components/LanguageToggle";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <HealthTipsBanner language={language} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/education" element={<Education />} />
                <Route path="/healthcare" element={<Healthcare />} />
                <Route path="/literacy" element={<Literacy />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/misconceptions" element={<Misconceptions />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ask-doctor" element={<AskDoctor />} />
                <Route path="/locator" element={<HealthLocator />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <SOSButton />
            <WelcomePopup />
            <HealthChatbot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
