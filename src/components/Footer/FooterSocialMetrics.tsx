
import { Users, TrendingUp } from 'lucide-react';
import { SOCIAL_PLATFORMS } from '../social/SocialMediaData';

const FooterSocialMetrics = () => {
  const totalFollowers = SOCIAL_PLATFORMS.reduce((sum, platform) => 
    sum + (platform.followerCount || 0), 0
  );

  return (
    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
          Comunidade Ativa
        </span>
      </div>
      <div className="flex items-center gap-1 text-sm text-blue-700 dark:text-blue-300">
        <Users className="h-3 w-3" />
        <span>{totalFollowers.toLocaleString()} seguidores</span>
      </div>
    </div>
  );
};

export default FooterSocialMetrics;
