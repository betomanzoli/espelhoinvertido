
import { Check } from 'lucide-react';

const FooterTrustIndicators = () => {
  const indicators = [
    "Pensamento Crítico Garantido",
    "50+ publicações verificadas",
    "Conteúdo multi-plataforma"
  ];

  return (
    <div className="mt-4 space-y-2">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span>{indicator}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterTrustIndicators;
