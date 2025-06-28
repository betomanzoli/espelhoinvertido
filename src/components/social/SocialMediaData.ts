
export interface SocialPlatform {
  id: string;
  name: string;
  displayName: string;
  url: string;
  icon: string;
  color: string;
  description: string;
  followerCount?: number;
  isActive: boolean;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'substack',
    name: 'substack',
    displayName: 'Substack',
    url: 'https://espelhoinvertido.substack.com/',
    icon: '📝',
    color: '#FF6719',
    description: 'Análises profundas e crônicas dialéticas',
    followerCount: 2500,
    isActive: true
  },
  {
    id: 'youtube',
    name: 'youtube',
    displayName: 'YouTube',
    url: 'https://www.youtube.com/@EspelhoInvertido-mirrorshards',
    icon: '🎥',
    color: '#FF0000',
    description: 'Vídeos educativos e debates ideológicos',
    followerCount: 1200,
    isActive: true
  },
  {
    id: 'linkedin',
    name: 'linkedin',
    displayName: 'LinkedIn',
    url: 'https://www.linkedin.com/in/espelhoinvertido/',
    icon: '💼',
    color: '#0077B5',
    description: 'Artigos profissionais e networking acadêmico',
    followerCount: 850,
    isActive: true
  },
  {
    id: 'instagram',
    name: 'instagram',
    displayName: 'Instagram',
    url: 'https://www.instagram.com/espe.lhoinvertido/',
    icon: '📸',
    color: '#E4405F',
    description: 'Conteúdo visual e stories filosóficos',
    followerCount: 3400,
    isActive: true
  },
  {
    id: 'tiktok',
    name: 'tiktok',
    displayName: 'TikTok',
    url: 'https://www.tiktok.com/@espelhoinvertido',
    icon: '🎵',
    color: '#000000',
    description: 'Vídeos curtos e challenges filosóficos',
    followerCount: 5600,
    isActive: true
  }
];

export const getSocialPlatform = (id: string): SocialPlatform | undefined => {
  return SOCIAL_PLATFORMS.find(platform => platform.id === id);
};

export const getActivePlatforms = (): SocialPlatform[] => {
  return SOCIAL_PLATFORMS.filter(platform => platform.isActive);
};
