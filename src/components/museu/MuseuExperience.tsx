
import React from 'react';
import { Eye, Video, BookOpen, History } from 'lucide-react';

interface MuseuExperienceProps {
  educationalPerspectives?: string[];
}

const MuseuExperience: React.FC<MuseuExperienceProps> = ({ educationalPerspectives = [] }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-xl font-medium mb-4">Uma jornada imersiva pela história</h3>
        <p className="mb-4">O Museu Virtual das Revoluções oferece uma experiência totalmente nova de aprendizado histórico:</p>
        
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <span>Navegação em primeira pessoa pelos cenários históricos</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <Video className="h-4 w-4 text-primary" />
            </div>
            <span>Interação com personagens históricos através de diálogos baseados em seus escritos reais</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <span>Acesso a textos, manifestos e documentos da época em seu contexto original</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-primary/10 p-1 rounded-full mt-1">
              <History className="h-4 w-4 text-primary" />
            </div>
            <span>Possibilidade de acompanhar o desenvolvimento das revoluções dia a dia</span>
          </li>
        </ul>
      </div>
      
      {educationalPerspectives && educationalPerspectives.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationalPerspectives.map((feature, index) => (
            <div key={index} className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-primary">Perspectiva Educacional</h3>
              <p className="text-sm">{feature}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MuseuExperience;
