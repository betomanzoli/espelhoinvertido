import React from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import ChronicleAutomationDashboard from '@/components/admin/ChronicleAutomationDashboard';

const AutomacaoAdmin = () => {
  return (
    <>
      <SEOHead 
        title="Automação Admin - Espelho Invertido"
        description="Dashboard administrativo para gerenciar a automação de geração e distribuição de crônicas"
        keywords="automação, admin, crônicas, distribuição, Espelho Invertido"
        canonical="https://espelhoinvertido.com.br/admin/automacao"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-espelhoinvertido-background via-white to-espelhoinvertido-accent/5">
        <ChronicleAutomationDashboard />
      </div>
    </>
  );
};

export default AutomacaoAdmin;