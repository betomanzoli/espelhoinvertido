
import { conceptLibrary } from '@/lib/debateData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConceptTooltipProps {
  term: string;
  children: React.ReactNode;
}

const ConceptTooltip = ({ term, children }: ConceptTooltipProps) => {
  const concept = conceptLibrary.find(
    (c) => c.term.toLowerCase() === term.toLowerCase()
  );

  if (!concept) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-md">
          <div className="space-y-2">
            <h4 className="font-bold text-burgundy">{concept.term}</h4>
            <p className="text-sm">{concept.definition}</p>
            <p className="text-xs italic text-gray-500">Fonte: {concept.source}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConceptTooltip;
