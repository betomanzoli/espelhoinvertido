
import { Card } from "@/components/ui/card";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectTabs from "@/components/project/ProjectTabs";
import ProjectActions from "@/components/project/ProjectActions";
import ProjectSkeleton from "@/components/project/ProjectSkeleton";
import { useProjectInfo } from "@/hooks/useProjectInfo";

interface ProjectComingSoonProps {
  title: string;
}

const ProjectComingSoon = ({ title }: ProjectComingSoonProps) => {
  const { projectInfo, isLoading } = useProjectInfo(title);

  if (isLoading) {
    return <ProjectSkeleton />;
  }

  if (!projectInfo) return null;

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card overflow-hidden">
            <ProjectHeader 
              title={title}
              icon={projectInfo.icon}
              coverImage={projectInfo.coverImage}
              substackUrl={projectInfo.substackUrl}
            />
            
            <div className="p-8 md:p-12">
              {!projectInfo.coverImage && (
                // Header já renderiza estes elementos quando não há imagem de capa
                <div className="mb-8"></div>
              )}
              
              <div className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
                  {projectInfo.description}
                </p>
                
                <ProjectTabs 
                  features={projectInfo.features}
                  tabs={projectInfo.tabs}
                />
              </div>
              
              <ProjectActions substackUrl={projectInfo.substackUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComingSoon;
