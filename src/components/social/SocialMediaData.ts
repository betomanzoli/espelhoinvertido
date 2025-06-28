
export interface SocialPlatform {
  id: string;
  name: string;
  displayName: string;
  url: string;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
  verified: boolean;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'substack',
    name: 'substack',
    displayName: 'Substack',
    url: 'https://espelhoinvertido.substack.com/',
    icon: '📝',
    color: '#FF6719',
    description: 'Análises profundas e crônicas dialéticas sobre temas contemporâneos',
    isActive: true,
    verified: true
  },
  {
    id: 'youtube',
    name: 'youtube',
    displayName: 'YouTube',
    url: 'https://www.youtube.com/@EspelhoInvertido-mirrorshards',
    icon: '🎥',
    color: '#FF0000',
    description: 'Vídeos educativos e debates sobre perspectivas ideológicas',
    isActive: true,
    verified: true
  },
  {
    id: 'linkedin',
    name: 'linkedin',
    displayName: 'LinkedIn',
    url: 'https://www.linkedin.com/in/espelhoinvertido/',
    icon: '💼',
    color: '#0077B5',
    description: 'Artigos profissionais e análises do mundo contemporâneo',
    isActive: true,
    verified: true
  },
  {
    id: 'instagram',
    name: 'instagram',
    displayName: 'Instagram',
    url: 'https://www.instagram.com/espe.lhoinvertido/',
    icon: '📸',
    color: '#E4405F',
    description: 'Conteúdo visual e reflexões sobre temas atuais',
    isActive: true,
    verified: true
  },
  {
    id: 'tiktok',
    name: 'tiktok',
    displayName: 'TikTok',
    url: 'https://www.tiktok.com/@espelhoinvertido',
    icon: '🎵',
    color: '#000000',
    description: 'Vídeos curtos e análises rápidas de temas complexos',
    isActive: true,
    verified: true
  }
];

export const getSocialPlatform = (id: string): SocialPlatform | undefined => {
  return SOCIAL_PLATFORMS.find(platform => platform.id === id);
};

export const getActivePlatforms = (): SocialPlatform[] => {
  return SOCIAL_PLATFORMS.filter(platform => platform.isActive);
};

export const getVerifiedPlatforms = (): SocialPlatform[] => {
  return SOCIAL_PLATFORMS.filter(platform => platform.verified);
};
