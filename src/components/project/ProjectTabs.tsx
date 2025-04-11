
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeatureList {
  overview?: string[];
  gameplay?: string[];
  educational?: string[];
  technical?: string[];
  [key: string]: string[] | undefined;
}

interface ProjectTabsProps {
  features: string[];
  tabs: {
    gameplay: string[];
    educational: string[];
    technical: string[];
  };
}

const ProjectTabs = ({ features, tabs }: ProjectTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="features">Funcionalidades</TabsTrigger>
        <TabsTrigger value="technical">Tecnologia</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Principais Características:</h3>
        <ul className="space-y-2 pl-6 list-disc text-gray-700 dark:text-gray-300">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </TabsContent>
      
      <TabsContent value="features" className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Funcionalidades Detalhadas:</h3>
        <ul className="space-y-2 pl-6 list-disc text-gray-700 dark:text-gray-300">
          {tabs.gameplay && tabs.gameplay.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </TabsContent>
      
      <TabsContent value="technical" className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Aspectos Técnicos:</h3>
        <ul className="space-y-2 pl-6 list-disc text-gray-700 dark:text-gray-300">
          {tabs.technical && tabs.technical.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;
