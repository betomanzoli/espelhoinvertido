
import { Check, Shield, Globe } from 'lucide-react';

const FooterTrustIndicators = () => {
  const indicators = [
    { icon: Shield, text: "Análises Verificadas" },
    { icon: Globe, text: "Conteúdo Multi-plataforma" },
    { icon: Check, text: "Fontes Autênticas" }
  ];

  return (
    <div className="mt-4 space-y-2">
      {indicators.map((indicator, index) => {
        const IconComponent = indicator.icon;
        return (
          <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <IconComponent className="h-4 w-4 text-espelhoinvertido-gold mr-2" />
            <span>{indicator.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FooterTrustIndicators;
