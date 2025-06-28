
import { Users, TrendingUp, Verified } from 'lucide-react';
import { SOCIAL_PLATFORMS } from '../social/SocialMediaData';

const FooterSocialMetrics = () => {
  const verifiedPlatforms = SOCIAL_PLATFORMS.filter(platform => platform.verified);

  return (
    <div className="p-3 bg-gradient-to-r from-espelhoinvertido-primary/5 to-espelhoinvertido-accent/5 dark:from-espelhoinvertido-primary/10 dark:to-espelhoinvertido-accent/10 rounded-lg border border-espelhoinvertido-accent/20">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="h-4 w-4 text-espelhoinvertido-accent" />
        <span className="text-sm font-medium text-espelhoinvertido-primary dark:text-espelhoinvertido-light">
          Presença Verificada
        </span>
      </div>
      <div className="flex items-center gap-1 text-sm text-espelhoinvertido-text dark:text-espelhoinvertido-silver">
        <Verified className="h-3 w-3 text-espelhoinvertido-gold" />
        <span>{verifiedPlatforms.length} plataformas ativas</span>
      </div>
    </div>
  );
};

export default FooterSocialMetrics;
