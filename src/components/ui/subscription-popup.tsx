
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bell, ExternalLink } from 'lucide-react';

interface SubscriptionPopupProps {
  delay?: number;
}

const SubscriptionPopup = ({ delay = 30000 }: SubscriptionPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem('subscriptionPopupShown');
    if (popupShown) return;

    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('subscriptionPopupShown', 'true');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-md w-full card-espelho animate-slide-up border-2 border-amber-500/20">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
              <Bell className="w-8 h-8" />
            </div>
            <CardTitle className="text-xl">Gostou das Crônicas?</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Receba análises completas e conteúdo exclusivo sobre vieses 
            de confirmação e contradições ideológicas diretamente no seu email.
          </p>
          
          <div className="space-y-3">
            <Button 
              asChild 
              className="w-full btn-accent"
            >
              <a 
                href="https://espelhoinvertido.substack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Inscrever-se Gratuitamente
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            
            <Button variant="ghost" onClick={handleClose} className="w-full text-sm">
              Talvez mais tarde
            </Button>
          </div>
          
          <p className="text-xs text-slate-500">
            📧 Newsletter gratuita • 🚫 Sem spam • ✋ Cancele quando quiser
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPopup;
