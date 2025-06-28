
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import AnimatedLogo from '@/components/AnimatedLogo';

const phrases = [
  "Explore ideias que desafiam suas certezas.", 
  "Descubra como diferentes perspectivas ideológicas moldam nossa visão do mundo.", 
  "Questione narrativas estabelecidas e construa seu próprio entendimento.", 
  "Expanda seus horizontes com diálogos críticos e provocadores.",
  "Identifique vieses de confirmação em discursos cotidianos.",
  "Transforme conflitos ideológicos em oportunidades de crescimento intelectual."
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
      {/* Background sofisticado com tema espelho */}
      <div className="absolute inset-0 bg-mirror-gradient">
        {/* Padrão de reflexão */}
        <div className="absolute inset-0 reflection-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-dot-pattern bg-[length:20px_20px] opacity-20"></div>
        
        {/* Elementos flutuantes temáticos */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-espelhoinvertido-accent/20 blur-3xl animate-reflection"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-espelhoinvertido-truth/20 blur-3xl animate-mirror-flip" style={{
          animationDelay: '2s'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 rounded-full bg-espelhoinvertido-bias/10 blur-3xl animate-pulse-glow" style={{
          animationDelay: '4s'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-slide-up">
            <AnimatedLogo size="lg" showText={true} className="justify-center text-white" />
          </div>
          
          <div className="h-28 md:h-24 mb-8">
            <p className="text-xl md:text-2xl text-white/95 font-light leading-relaxed animate-slide-up min-h-[4rem]" style={{
              animationDelay: '0.1s'
            }}>
              {displayText}
              <span className="animate-pulse text-espelhoinvertido-accent font-bold">|</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up mb-8" style={{
            animationDelay: '0.2s'
          }}>
            <Button asChild size="lg" className="button-accent gap-2 text-lg px-8 py-4 hover-reflect">
              <Link to="/debate">
                Comece a explorar
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild size="lg" className="button-mirror gap-2 text-lg px-8 py-4 hover-reflect">
              <Link to="/library">
                Explorar crônicas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Indicadores temáticos */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80 animate-slide-up" style={{
            animationDelay: '0.3s'
          }}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-espelhoinvertido-truth animate-truth-glow"></span>
              <span>Análise Crítica</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-espelhoinvertido-bias animate-bias-pulse"></span>
              <span>Identificação de Vieses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-espelhoinvertido-accent animate-pulse"></span>
              <span>Perspectivas Múltiplas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
