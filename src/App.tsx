import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Concept from "./pages/Concept";
import Corpus from "./pages/Corpus";
import News from "./pages/News";
import Interview from "./pages/Interview";
import Publications from "./pages/Publications";
import Bibliography from "./pages/Bibliography";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
    <img src="/website_loading.gif" alt="Loading..." className="w-32 h-32 object-contain" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = ({ lang, setLang }: { lang: string; setLang: (l: string) => void }) => {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="page-fade-in">
      <Routes>
        <Route path="/" element={<Index lang={lang} setLang={setLang} />} />
        <Route path="/team" element={<Team lang={lang} setLang={setLang} />} />
        <Route path="/concept" element={<Concept lang={lang} setLang={setLang} />} />
        <Route path="/corpus" element={<Corpus lang={lang} setLang={setLang} />} />
        <Route path="/news" element={<News lang={lang} setLang={setLang} />} />
        <Route path="/interview" element={<Interview lang={lang} setLang={setLang} />} />
        <Route path="/publications" element={<Publications lang={lang} setLang={setLang} />} />
        <Route path="/bibliography" element={<Bibliography lang={lang} setLang={setLang} />} />
        <Route path="/contact" element={<Contact lang={lang} setLang={setLang} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") {
      return "de";
    }
    const savedLang = window.localStorage.getItem("fsl-lang");
    return savedLang === "en" ? "en" : "de";
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Keep the document language in sync for proper hyphenation rules
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("fsl-lang", lang);
    }
  }, [lang]);

  if (!appReady) return <LoadingOverlay />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes lang={lang} setLang={setLang} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
