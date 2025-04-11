
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
import SimuladorRevolucoes from "./pages/SimuladorRevolucoes";
import MapaConflitos from "./pages/MapaConflitos";
import MuseuVirtual from "./pages/MuseuVirtual";
import EconomiaAcao from "./pages/EconomiaAcao";

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
                
                {/* Project routes - Agora implementadas */}
                <Route path="/mapa-conflitos" element={<MapaConflitos />} />
                <Route path="/simulador" element={<SimuladorRevolucoes />} />
                <Route path="/museu" element={<MuseuVirtual />} />
                <Route path="/economia" element={<EconomiaAcao />} />
                
                {/* Projetos que ainda estão em desenvolvimento */}
                <Route path="/cronicas" element={<ProjectComingSoon title="Escreva Sua Crônica" />} />
                <Route path="/analise-discurso" element={<ProjectComingSoon title="Análise de Discurso" />} />
                
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
