import { useState, useEffect } from 'react';

interface SocialMetrics {
  platform: string;
  followers: number;
  engagement: number;
  growth: number;
  isLoading: boolean;
}

interface UseSocialMetricsReturn {
  metrics: SocialMetrics[];
  totalFollowers: number;
  avgEngagement: number;
  isLoading: boolean;
  refreshMetrics: () => void;
}

// Mock data - em produção, viria de APIs reais
const mockMetrics: Omit<SocialMetrics, 'isLoading'>[] = [
  { platform: 'substack', followers: 847, engagement: 23.5, growth: 12.3 },
  { platform: 'youtube', followers: 2341, engagement: 18.7, growth: 8.9 },
  { platform: 'linkedin', followers: 1523, engagement: 31.2, growth: 15.6 },
  { platform: 'instagram', followers: 967, engagement: 14.8, growth: 22.1 },
  { platform: 'tiktok', followers: 678, engagement: 45.3, growth: 31.7 },
];

export const useSocialMetrics = (): UseSocialMetricsReturn => {
  const [metrics, setMetrics] = useState<SocialMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMetrics = async () => {
    setIsLoading(true);
    // Simular loading de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const metricsWithLoading = mockMetrics.map(metric => ({
      ...metric,
      isLoading: false
    }));
    
    setMetrics(metricsWithLoading);
    setIsLoading(false);
  };

  const refreshMetrics = () => {
    loadMetrics();
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const totalFollowers = metrics.reduce((sum, metric) => sum + metric.followers, 0);
  const avgEngagement = metrics.length > 0 
    ? metrics.reduce((sum, metric) => sum + metric.engagement, 0) / metrics.length 
    : 0;

  return {
    metrics,
    totalFollowers,
    avgEngagement,
    isLoading,
    refreshMetrics
  };
};