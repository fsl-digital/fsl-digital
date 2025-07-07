import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Concept from "./pages/Concept";
import Corpus from "./pages/Corpus";
import News from "./pages/News";
import Publications from "./pages/Publications";
import Bibliography from "./pages/Bibliography";

const queryClient = new QueryClient();

const App = () => {
  const [lang, setLang] = useState("en");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/fsl-digital">
          <Routes>
            <Route path="/" element={<Index lang={lang} setLang={setLang} />} />
            <Route path="/team" element={<Team lang={lang} setLang={setLang} />} />
            <Route path="/concept" element={<Concept lang={lang} setLang={setLang} />} />
            <Route path="/corpus" element={<Corpus lang={lang} setLang={setLang} />} />
            <Route path="/news" element={<News lang={lang} setLang={setLang} />} />
            <Route path="/publications" element={<Publications lang={lang} setLang={setLang} />} />
            <Route path="/bibliography" element={<Bibliography lang={lang} setLang={setLang} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
