
import { ExternalLink } from 'lucide-react';
import { SOCIAL_PLATFORMS } from '../social/SocialMediaData';

const FooterSocialLinks = () => {
  return (
    <div className="space-y-3">
      {SOCIAL_PLATFORMS.map((platform) => (
        <a
          key={platform.id}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">
            {platform.icon}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{platform.displayName}</span>
              <ExternalLink className="h-3 w-3" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {platform.followerCount?.toLocaleString()} seguidores
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default FooterSocialLinks;
