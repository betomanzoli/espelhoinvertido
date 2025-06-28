
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import AnimatedLogo from '@/components/AnimatedLogo';

const phrases = [
  "Explore como o viés de confirmação molda nossa interpretação da realidade.", 
  "Descubra as contradições ideológicas através de crônicas provocativas.", 
  "Questione suas certezas com narrativas que desafiam perspectivas estabelecidas.", 
  "Identifique como diferentes filtros ideológicos interpretam os mesmos eventos.",
  "Transforme conflitos de interpretação em oportunidades de crescimento intelectual.",
  "Experimente o desconforto necessário para superar bolhas de confirmação."
];

const HeroSection = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const currentPhrase = phrases[currentPhraseIndex];

  // Efeito de digitação aprimorado
  useEffect(() => {
    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        const timeoutId = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
        const timeoutId = setTimeout(() => {
          setIsTyping(true);
          setDisplayText('');
          setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
        }, 3500);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [displayText, isTyping, currentPhrase, currentPhraseIndex]);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background sofisticado focado em viés de confirmação */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        {/* Elementos de reflexão e dualidade */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-500/30 blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-500/30 blur-3xl animate-pulse-glow" style={{
            animationDelay: '2s'
          }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 rounded-full bg-gradient-to-r from-red-400/20 to-pink-500/20 blur-3xl animate-pulse-glow" style={{
            animationDelay: '4s'
          }}></div>
        </div>
        
        {/* Padrão de espelhamento */}
        <div className="absolute inset-0 bg-dot-pattern bg-[length:20px_20px] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-slide-up">
            <AnimatedLogo size="lg" showText={true} className="justify-center text-white" />
          </div>
          
          <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Vieses e Narrativas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light">
              Crônicas sobre Contradições Ideológicas
            </p>
          </div>
          
          <div className="h-28 md:h-24 mb-8">
            <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed animate-slide-up min-h-[4rem]" style={{
              animationDelay: '0.2s'
            }}>
              {displayText}
              <span className="animate-pulse text-amber-400 font-bold">|</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up mb-8" style={{
            animationDelay: '0.3s'
          }}>
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-900 font-semibold gap-2 text-lg px-8 py-4">
              <Link to="/chronicles">
                Explorar Crônicas
                <BookOpen className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 text-lg px-8 py-4">
              <Link to="/bias-lab">
                Laboratório de Viés
                <Users className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Indicadores temáticos focados em viés */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80 animate-slide-up" style={{
            animationDelay: '0.4s'
          }}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Viés de Confirmação</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Narrativas Contrastantes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              <span>Reflexão Crítica</span>
            </div>
          </div>

          {/* Call-to-action específico para o projeto */}
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-slide-up" style={{
            animationDelay: '0.5s'
          }}>
            <p className="text-white/90 text-sm mb-4">
              "Se durante a exploração você sentir desconforto ou irritação, reconheça que essa reação pode ser precisamente o que os textos buscam provocar."
            </p>
            <p className="text-white/70 text-xs">
              Uma obra que explora como diferentes perspectivas ideológicas moldam nossa interpretação da realidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
