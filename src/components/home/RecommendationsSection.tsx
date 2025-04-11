
import { Chronicle } from './ChronicleCard';
import RecommendationCard from './RecommendationCard';

interface RecommendationsSectionProps {
  category: string;
  recommendations: Chronicle[];
}

const RecommendationsSection = ({ category, recommendations }: RecommendationsSectionProps) => {
  if (recommendations.length === 0) return null;
  
  return (
    <div className="md:col-span-3 mt-6">
      <h3 className="text-xl font-medium mb-4">Recomendações relacionadas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((chronicle) => (
          <RecommendationCard key={chronicle.id} chronicle={chronicle} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
