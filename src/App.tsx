
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Debate from "./pages/Debate";
import Library from "./pages/Library";
import ChronicleDetail from "./pages/ChronicleDetail";
import Resources from "./pages/Resources";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectComingSoon from "./pages/ProjectComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/debate" element={<Debate />} />
                <Route path="/debate/:topicId" element={<Debate />} />
                <Route path="/library" element={<Library />} />
                <Route path="/library/chronicle/:chronicleId" element={<ChronicleDetail />} />
                <Route path="/resources" element={<Resources />} />
                
                {/* Project routes */}
                <Route path="/mapa-conflitos" element={<ProjectComingSoon title="Mapa de Conflitos Ideológicos" />} />
                <Route path="/simulador" element={<ProjectComingSoon title="Simulador de Revoluções" />} />
                <Route path="/museu" element={<ProjectComingSoon title="Museu Virtual das Revoluções" />} />
                <Route path="/cronicas" element={<ProjectComingSoon title="Escreva Sua Crônica" />} />
                <Route path="/analise-discurso" element={<ProjectComingSoon title="Análise de Discurso" />} />
                <Route path="/economia" element={<ProjectComingSoon title="Economia em Ação" />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
