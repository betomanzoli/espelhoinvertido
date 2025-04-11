
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import AnimatedLogo from '@/components/AnimatedLogo';

const phrases = [
  "Explore ideias que desafiam suas certezas.",
  "Descubra como diferentes perspectivas ideológicas moldam nossa visão do mundo.",
  "Questione narrativas estabelecidas e construa seu próprio entendimento.",
  "Expanda seus horizontes com diálogos críticos e provocadores."
];

const HeroSection = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const currentPhrase = phrases[currentPhraseIndex];
  
  // Efeito de digitação
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
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 3000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [displayText, isTyping, currentPhrase, currentPhraseIndex]);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-500 opacity-90">
        {/* Padrão de pontos sobrepostos */}
        <div className="absolute inset-0 bg-dot-pattern bg-[length:20px_20px] opacity-20"></div>
        
        {/* Círculos de luz flutuantes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-300/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 text-white animate-slide-up">
            <AnimatedLogo size="lg" showText={true} className="justify-center" />
          </div>
          
          <div className="h-24 md:h-20">
            <p className="text-lg md:text-xl text-white mb-8 animate-slide-up min-h-[4rem]" style={{ animationDelay: '0.1s' }}>
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="gap-2 bg-white text-blue-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
              <Link to="/debate">
                Comece a explorar
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <Link to="/library">
                Explorar crônicas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
