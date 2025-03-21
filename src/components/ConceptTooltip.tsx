
import { conceptLibrary } from '@/lib/debateData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Book } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConceptTooltipProps {
  term: string;
  children: React.ReactNode;
  variant?: 'burgundy' | 'navy';
}

const ConceptTooltip = ({ 
  term, 
  children, 
  variant = 'burgundy' 
}: ConceptTooltipProps) => {
  const concept = conceptLibrary.find(
    (c) => c.term.toLowerCase() === term.toLowerCase()
  );

  if (!concept) {
    return <>{children}</>;
  }

  // Determine which categories the concept might relate to
  const relatedCategories = () => {
    const term = concept.term.toLowerCase();
    if (term.includes('mais-valia') || term.includes('fetichismo')) {
      return 'economia, capitalismo e teoria marxista';
    } else if (term.includes('hegemonia') || term.includes('cultural')) {
      return 'cultura, poder e ideologia';
    } else if (term.includes('polarização') || term.includes('política')) {
      return 'política, democracia e mídia';
    }
    return 'economia política e globalização';
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={cn(
            "cursor-help border-b border-dotted font-medium transition-colors",
            variant === 'burgundy' ? "border-burgundy/40 hover:border-burgundy text-burgundy" : "border-navy/40 hover:border-navy text-navy"
          )}>
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center"
          className="max-w-sm p-4 backdrop-blur-md bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Book className={cn(
                "h-4 w-4",
                variant === 'burgundy' ? "text-burgundy" : "text-navy"
              )} />
              <h4 className={cn(
                "font-bold",
                variant === 'burgundy' ? "text-burgundy" : "text-navy"
              )}>
                {concept.term}
              </h4>
            </div>
            
            <p className="text-sm">{concept.definition}</p>
            
            <div className="pt-1 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Relacionado a: <span className={cn(
                  "font-medium",
                  variant === 'burgundy' ? "text-burgundy" : "text-navy"
                )}>{relatedCategories()}</span>
              </p>
              <p className="text-xs italic text-gray-500 mt-1">
                Fonte: {concept.source}
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConceptTooltip;
