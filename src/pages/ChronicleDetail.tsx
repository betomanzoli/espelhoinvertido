
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Chronicle } from '@/lib/debateData';
import { fetchPostBySlug } from '@/services/substackService';
import { convertSubstackPostsToChronicles } from '@/components/home/ChroniclesData';
import { toast } from 'sonner';

const ChronicleDetail = () => {
  const { chronicleId } = useParams<{ chronicleId: string }>();
  const [chronicle, setChronicle] = useState<Chronicle | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChronicle = async () => {
      setLoading(true);
      try {
        const post = await fetchPostBySlug(chronicleId || '');
        if (post) {
          const [chronicleData] = convertSubstackPostsToChronicles([post]);
          setChronicle(chronicleData);
        } else {
          toast.error("Crônica não encontrada");
          navigate('/library');
        }
      } catch (error) {
        console.error("Erro ao carregar crônica:", error);
        toast.error("Erro ao carregar crônica");
      } finally {
        setLoading(false);
      }
    };

    if (chronicleId) {
      fetchChronicle();
    }
  }, [chronicleId, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: chronicle?.title || "Espelho Invertido",
        text: chronicle?.excerpt || "Confira esta crônica no Espelho Invertido",
        url: window.location.href
      }).then(() => {
        toast.success("Compartilhado com sucesso!");
      }).catch(error => {
        console.error("Erro ao compartilhar:", error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência");
    }
  };

  const renderContent = () => {
    if (!chronicle?.content) return null;
    
    // Converte quebras de linha em parágrafos HTML
    const paragraphs = chronicle.content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        {loading ? (
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : chronicle ? (
          <div className="max-w-3xl mx-auto">
            <article className="glass-card p-8">
              {chronicle.image && (
                <div className="mb-6 -mx-8 -mt-8">
                  <img 
                    src={chronicle.image} 
                    alt={chronicle.title} 
                    className="w-full h-72 object-cover"
                  />
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {chronicle.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(chronicle.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {chronicle.author}
                </div>
                <div className="flex flex-wrap gap-2">
                  {chronicle.tags.map(tag => (
                    <Link 
                      key={tag} 
                      to={`/library?category=${tag}`}
                      className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {renderContent()}
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href={chronicle.url} target="_blank" rel="noopener noreferrer">
                    Ver original no Substack
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  Compartilhar
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </article>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Crônica não encontrada
            </p>
            <Button asChild>
              <Link to="/library">Voltar para a Biblioteca</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChronicleDetail;
