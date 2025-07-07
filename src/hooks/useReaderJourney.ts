import { useState, useEffect } from 'react';

interface JourneyStep {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  icon: string;
  points: number;
}

interface ReaderJourney {
  steps: JourneyStep[];
  totalPoints: number;
  level: number;
  badges: string[];
  progress: number;
}

const journeySteps: Omit<JourneyStep, 'completed'>[] = [
  { id: 'visit-home', name: 'Primeiro Contato', description: 'Visitou a página inicial', icon: '🏠', points: 10 },
  { id: 'read-chronicle', name: 'Leitor Curioso', description: 'Leu uma crônica completa', icon: '📖', points: 25 },
  { id: 'visit-debate', name: 'Explorador de Diálogos', description: 'Visitou o chat Rafael e Luísa', icon: '💬', points: 20 },
  { id: 'follow-social', name: 'Conectado', description: 'Seguiu uma rede social', icon: '🔗', points: 15 },
  { id: 'subscribe-newsletter', name: 'Assinante', description: 'Se inscreveu no Substack', icon: '📧', points: 50 },
  { id: 'bias-lab', name: 'Científico do Viés', description: 'Explorou o Laboratório de Viés', icon: '🔬', points: 30 },
  { id: 'share-content', name: 'Propagador', description: 'Compartilhou conteúdo', icon: '📤', points: 35 },
];

export const useReaderJourney = () => {
  const [journey, setJourney] = useState<ReaderJourney>({
    steps: [],
    totalPoints: 0,
    level: 1,
    badges: [],
    progress: 0
  });

  useEffect(() => {
    const savedJourney = localStorage.getItem('readerJourney');
    const completedSteps = savedJourney ? JSON.parse(savedJourney) : [];
    
    const steps = journeySteps.map(step => ({
      ...step,
      completed: completedSteps.includes(step.id)
    }));
    
    const totalPoints = steps
      .filter(step => step.completed)
      .reduce((sum, step) => sum + step.points, 0);
    
    const level = Math.floor(totalPoints / 100) + 1;
    const progress = (steps.filter(step => step.completed).length / steps.length) * 100;
    
    const badges = [];
    if (totalPoints >= 50) badges.push('🌟 Leitor Iniciante');
    if (totalPoints >= 100) badges.push('🎯 Explorador');
    if (totalPoints >= 200) badges.push('🏆 Mestre do Viés');
    
    setJourney({ steps, totalPoints, level, badges, progress });
  }, []);

  const completeStep = (stepId: string) => {
    const savedJourney = localStorage.getItem('readerJourney');
    const completedSteps = savedJourney ? JSON.parse(savedJourney) : [];
    
    if (!completedSteps.includes(stepId)) {
      const newCompletedSteps = [...completedSteps, stepId];
      localStorage.setItem('readerJourney', JSON.stringify(newCompletedSteps));
      
      // Atualizar estado local
      setJourney(prev => {
        const updatedSteps = prev.steps.map(step => 
          step.id === stepId ? { ...step, completed: true } : step
        );
        
        const totalPoints = updatedSteps
          .filter(step => step.completed)
          .reduce((sum, step) => sum + step.points, 0);
        
        const level = Math.floor(totalPoints / 100) + 1;
        const progress = (updatedSteps.filter(step => step.completed).length / updatedSteps.length) * 100;
        
        return {
          ...prev,
          steps: updatedSteps,
          totalPoints,
          level,
          progress
        };
      });
    }
  };

  return { journey, completeStep };
};