
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { chronicles, debateTopics } from '@/lib/debateData';
import { ArrowLeft, Calendar, ExternalLink, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DebateTopicCard from '@/components/DebateTopicCard';
import ConceptTooltip from '@/components/ConceptTooltip';

const ChronicleDetail = () => {
  const { chronicleId } = useParams();
  const [relatedTopics, setRelatedTopics] = useState([]);
  
  const chronicle = chronicles.find(c => c.id === chronicleId);
  
  useEffect(() => {
    if (chronicle?.relatedTopics) {
      const topics = debateTopics.filter(topic => 
        chronicle.relatedTopics?.includes(topic.id)
      );
      setRelatedTopics(topics);
    }
  }, [chronicle]);
  
  if (!chronicle) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Crônica não encontrada</h2>
          <Link to="/library" className="text-primary hover:underline">
            Voltar para a biblioteca
          </Link>
        </div>
      </div>
    );
  }
  
  // Function to format the content with ConceptTooltip for certain terms
  const formatContent = (content) => {
    const conceptTerms = ['mais-valia', 'alienação', 'fetichismo da mercadoria', 'hegemonia cultural', 'neoliberalismo'];
    
    let formattedContent = content;
    
    // Split content by paragraphs
    return content.split('\n\n').map((paragraph, index) => {
      // Check each concept term and wrap it with ConceptTooltip
      conceptTerms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        if (regex.test(paragraph)) {
          paragraph = paragraph.replace(regex, match => 
            `<concept>${match}</concept>`
          );
        }
      });
      
      // Process the paragraph JSX with concept tooltips
      if (paragraph.includes('<concept>')) {
        const parts = [];
        let lastIndex = 0;
        
        // Regular expression to find <concept>term</concept> patterns
        const conceptRegex = /<concept>(.*?)<\/concept>/g;
        let match;
        
        while ((match = conceptRegex.exec(paragraph)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            parts.push(paragraph.substring(lastIndex, match.index));
          }
          
          // Add the wrapped concept
          const term = match[1];
          parts.push(
            <ConceptTooltip key={`${index}-${match.index}`} term={term.toLowerCase()}>
              {term}
            </ConceptTooltip>
          );
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add any remaining text
        if (lastIndex < paragraph.length) {
          parts.push(paragraph.substring(lastIndex));
        }
        
        return <p key={index} className="mb-4">{parts}</p>;
      }
      
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/library" className="inline-flex items-center text-primary hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para a biblioteca
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-slide-up">
            {chronicle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(chronicle.date).toLocaleDateString('pt-BR')}
            </div>
            
            <div>
              Por <span className="font-medium">{chronicle.author}</span>
            </div>
            
            <a 
              href={chronicle.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline"
            >
              Ver original <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {chronicle.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
              >
                <Tag className="w-3 h-3 mr-1 opacity-70" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-5">
            <div className="glass-card p-6 mb-8 animate-slide-up prose prose-gray dark:prose-invert max-w-none" style={{ animationDelay: '0.2s' }}>
              <div className="text-lg">
                {formatContent(chronicle.content)}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {relatedTopics.length > 0 && (
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-medium mb-4">Debates Relacionados</h3>
                <div className="space-y-4">
                  {relatedTopics.map(topic => (
                    <DebateTopicCard 
                      key={topic.id} 
                      topic={topic} 
                      className="text-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChronicleDetail;
