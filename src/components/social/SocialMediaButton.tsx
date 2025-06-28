
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Users } from 'lucide-react';
import SocialMediaWidget from './SocialMediaWidget';

const SocialMediaButton = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-4 z-40">
        <Button
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          className="rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="icon"
        >
          {isWidgetOpen ? <Users className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
        </Button>
      </div>
      
      <SocialMediaWidget 
        isOpen={isWidgetOpen} 
        onClose={() => setIsWidgetOpen(false)} 
      />
    </>
  );
};

export default SocialMediaButton;
