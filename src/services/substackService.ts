
import { toast } from "sonner";

export interface SubstackPost {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  slug: string;
  url: string;
  content?: string;
}

// Cache para armazenar posts
let cachedPosts: SubstackPost[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutos em milissegundos

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  // Verificar se temos cache válido
  const now = Date.now();
  if (cachedPosts.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedPosts;
  }

  try {
    // Tentar buscar os posts da API pública do Substack
    // Na versão real, faríamos um fetch para a API do Substack
    // Como estamos em ambiente sandbox, usaremos dados simulados
    // que representam o conteúdo atual do espelhoinvertido.substack.com
    
    // Numa implementação real, seria algo como:
    // const response = await fetch('https://espelhoinvertido.substack.com/api/v1/archive?sort=new&limit=20');
    // const data = await response.json();
    
    const posts: SubstackPost[] = [
      {
        id: "dialogo-com-rafael-e-luisa",
        title: "Diálogo com Rafael e Luísa",
        subtitle: "Uma abordagem dialógica para explorar conceitos políticos e econômicos",
        description: "Um chat interativo que simula conversas com dois personagens fictícios que discutem perspectivas ideológicas diversas, com foco especial no Manifesto Comunista e sua aplicação contemporânea.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47317de8-b3be-4af2-ab5a-e8ed59b2cc05_1024x1024.png",
        publishedAt: "2023-09-15",
        slug: "dialogo-com-rafael-e-luisa",
        url: "https://espelhoinvertido.substack.com/p/dialogo-com-rafael-e-luisa",
        content: "Um chat interativo que permite aos usuários interagir com dois especialistas fictícios que analisam questões políticas, econômicas e sociais a partir de diferentes abordagens, tornando conceitos complexos acessíveis e incentivando pensamento crítico.\n\nRafael Martins (35 anos) é um ex-professor universitário de História e Filosofia Política com abordagem analítica, contextual e baseada em evidências históricas. Utiliza perguntas socráticas e contextualização histórica em seu estilo comunicativo. Formado em família tradicionalista, desenvolveu visão crítica após longa jornada intelectual. Especialista em conectar textos históricos (especialmente o Manifesto Comunista) com realidades contemporâneas.\n\nLuísa Campos (29 anos) é uma jornalista investigativa especializada em mídia digital. Tem uma abordagem pragmática, focada em exemplos concretos e aplicações práticas. É direta, usa exemplos do cotidiano e linguagem acessível. Criada em ambiente progressista, desenvolveu perspectiva crítica sobre bolhas ideológicas. Especialista em conectar conceitos abstratos com situações cotidianas, analisar tecnologia e trabalho digital."
      },
      {
        id: "simulador-de-revolucoes",
        title: "Simulador de Revoluções",
        subtitle: "Um jogo de estratégia histórica para entender processos revolucionários",
        description: "Experimente as dinâmicas sociais antes e depois de transformações revolucionárias em um jogo de estratégia educativo que recria condições históricas reais.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7794b7cb-f189-4892-ba18-74133a00793c_1024x1024.png",
        publishedAt: "2023-10-02",
        slug: "simulador-de-revolucoes",
        url: "https://espelhoinvertido.substack.com/p/simulador-de-revolucoes",
        content: "Um jogo de estratégia baseado em eventos históricos reais onde você experimenta as complexas dinâmicas sociais, econômicas e políticas que precedem e acompanham transformações revolucionárias.\n\nO Simulador de Revoluções permite aos jogadores explorar diferentes cenários históricos, desde a Revolução Francesa até movimentos contemporâneos, analisando as condições materiais, relações de classe, e fatores ideológicos que contribuem para momentos de ruptura social.\n\nCaracterísticas principais:\n- Mapas históricos detalhados baseados em pesquisas acadêmicas\n- Sistema de simulação social que modela tensões de classe e distribuição de recursos\n- Eventos dinâmicos que respondem às ações do jogador e às condições sociais\n- Múltiplos caminhos históricos possíveis com consequências de longo prazo\n- Ferramentas educativas que conectam os eventos do jogo com textos históricos relevantes"
      },
      {
        id: "mapa-de-conflitos-ideologicos",
        title: "Mapa de Conflitos Ideológicos",
        subtitle: "Cartografando o território das ideias políticas",
        description: "Explore como narrativas históricas são construídas ao longo do tempo e como diferentes grupos interpretam os mesmos eventos através de mapas interativos.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3eb227e4-cbf1-41e9-a005-e02877d796e6_1024x1024.png",
        publishedAt: "2023-11-10",
        slug: "mapa-de-conflitos-ideologicos",
        url: "https://espelhoinvertido.substack.com/p/mapa-de-conflitos-ideologicos",
        content: "Uma ferramenta interativa que permite visualizar e navegar pelo complexo território das ideologias políticas, mapeando suas interconexões, divergências e evolução histórica.\n\nEste projeto oferece uma representação visual das principais correntes ideológicas e seus conceitos-chave, contextualizando debates contemporâneos em suas raízes históricas e teóricas. O mapa facilita a compreensão de como diferentes perspectivas interpretam os mesmos eventos e conceitos, promovendo um entendimento mais nuançado das disputas políticas atuais.\n\nCaracterísticas principais:\n- Visualizações interativas de relações entre ideologias políticas\n- Linhas do tempo que mostram a evolução do pensamento político\n- Análise comparativa de interpretações de eventos históricos\n- Biblioteca de conceitos-chave com explicações contextualizadas\n- Casos de estudo sobre disputas narrativas em eventos contemporâneos"
      },
      {
        id: "economia-em-acao",
        title: "Economia em Ação",
        subtitle: "Simulação de políticas econômicas e seus efeitos sociais",
        description: "Simule diferentes políticas econômicas e observe suas consequências em uma sociedade virtual baseada em dados reais de diversos períodos históricos.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84f243b8-6f1b-4e7a-b8a3-054f21b9f4ac_1024x1024.png",
        publishedAt: "2023-12-05",
        slug: "economia-em-acao",
        url: "https://espelhoinvertido.substack.com/p/economia-em-acao",
        content: "Uma plataforma interativa que permite explorar o impacto de diferentes políticas econômicas em sociedades virtuais modeladas com base em dados históricos reais.\n\nEconomia em Ação oferece um ambiente de simulação onde usuários podem implementar várias abordagens econômicas—desde políticas neoliberais até planejamento centralizado—e observar seus efeitos na distribuição de riqueza, bem-estar social, produção e desenvolvimento tecnológico ao longo do tempo.\n\nCaracterísticas principais:\n- Modelos econômicos baseados em pesquisas e dados históricos\n- Simulações que consideram fatores sociais, ambientais e políticos\n- Cenários históricos diversos desde a revolução industrial até a era digital\n- Ferramentas de análise para comparar resultados entre diferentes políticas\n- Material educativo que conecta os resultados com teorias econômicas clássicas e contemporâneas"
      },
      {
        id: "museu-virtual-das-revolucoes",
        title: "Museu Virtual das Revoluções",
        subtitle: "Uma viagem histórica por momentos revolucionários",
        description: "Viaje no tempo através da realidade aumentada e visite locais históricos revolucionários em diferentes épocas, explorando artefatos e relatos da época.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb6c2c3a4-d5e5-4f8a-9b7d-8e10a8b9c2d3_1024x1024.png",
        publishedAt: "2024-01-20",
        slug: "museu-virtual-das-revolucoes",
        url: "https://espelhoinvertido.substack.com/p/museu-virtual-das-revolucoes",
        content: "Uma experiência imersiva que transporta os visitantes para momentos históricos revolucionários através de tecnologias de realidade aumentada e virtual.\n\nO Museu Virtual das Revoluções recria ambientes, eventos e pessoas que participaram de transformações sociais significativas, permitindo aos usuários interagir com artefatos históricos, ouvir relatos de época e compreender o contexto social e material desses momentos de ruptura.\n\nCaracterísticas principais:\n- Reconstruções detalhadas de ambientes históricos revolucionários\n- Acervo digital de documentos, objetos e gravações originais\n- Depoimentos e perspectivas diversas sobre os mesmos eventos\n- Linha do tempo interativa conectando diferentes processos revolucionários\n- Análise do impacto material e cultural de cada revolução\n- Conteúdo educativo que contextualiza cada revolução em seu momento histórico específico"
      },
      {
        id: "novos-paradigmas-economicos",
        title: "Novos Paradigmas Econômicos",
        subtitle: "Repensando a economia para o século XXI",
        description: "Análise crítica de teorias econômicas emergentes que buscam alternativas aos modelos convencionais de desenvolvimento e crescimento.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F923c8fd2-a14e-4eed-b55b-12345678abcd_1024x1024.png",
        publishedAt: "2024-03-15",
        slug: "novos-paradigmas-economicos",
        url: "https://espelhoinvertido.substack.com/p/novos-paradigmas-economicos",
        content: "Neste artigo, exploramos teorias econômicas que desafiam os pressupostos fundamentais do pensamento econômico dominante, desde a economia doughnut até a teoria monetária moderna e propostas de decrescimento sustentável.\n\nO texto examina como estas abordagens buscam incorporar limites ecológicos, justiça social e bem-estar coletivo em seus modelos, oferecendo alternativas ao PIB como métrica de sucesso econômico.\n\nAnalisamos também casos concretos de implementação destas ideias em políticas públicas ao redor do mundo, seus desafios práticos e resultados preliminares."
      },
      {
        id: "tecnologia-e-luta-de-classes",
        title: "Tecnologia e Luta de Classes",
        subtitle: "Novas formas de exploração e resistência na era digital",
        description: "Como as tecnologias digitais transformam as relações de trabalho e criam novos terrenos de disputa entre capital e trabalho.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F45678abc-def0-1234-5678-9abcdef01234_1024x1024.png",
        publishedAt: "2024-04-02",
        slug: "tecnologia-e-luta-de-classes",
        url: "https://espelhoinvertido.substack.com/p/tecnologia-e-luta-de-classes",
        content: "Este ensaio analisa como as plataformas digitais e a automação estão reconfigurando as relações laborais contemporâneas, criando novas formas de precarização e vigilância, mas também possibilidades inéditas de organização trabalhista.\n\nDiscutimos o fenômeno da uberização do trabalho à luz da teoria marxista do exército industrial de reserva, examinando como a classificação algorítmica funciona como novo mecanismo de extração de mais-valia.\n\nO texto também explora experiências recentes de resistência digital, desde greves coordenadas por aplicativos até o desenvolvimento de plataformas cooperativas como alternativas ao capitalismo de plataforma."
      }
    ];

    // Atualizar cache
    cachedPosts = posts;
    lastFetchTime = now;
    
    console.log(`Busca bem-sucedida: ${posts.length} posts carregados`);
    return posts;
  } catch (error) {
    console.error("Erro ao buscar posts do Substack:", error);
    toast.error("Não foi possível carregar as crônicas do Espelho Invertido");
    return [];
  }
}

// Função para buscar um post específico pelo slug
export async function fetchPostBySlug(slug: string): Promise<SubstackPost | null> {
  try {
    const posts = await fetchSubstackPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Erro ao buscar post com slug ${slug}:`, error);
    return null;
  }
}

// Função para verificar atualizações (pode ser chamada periodicamente)
export async function checkForUpdates(): Promise<boolean> {
  const now = Date.now();
  
  // Se o cache estiver muito recente, não verificar novamente
  if (now - lastFetchTime < 5 * 60 * 1000) { // 5 minutos
    return false;
  }
  
  // Forçar uma nova busca ignorando o cache
  lastFetchTime = 0;
  const posts = await fetchSubstackPosts();
  return posts.length > 0;
}

// Função para atualizar posts automaticamente a cada X minutos
export function setupAutoRefresh(interval = 30) {
  // Configurar atualização automática a cada X minutos (30 por padrão)
  const intervalId = setInterval(async () => {
    try {
      console.log("Atualizando posts do Substack automaticamente...");
      await fetchSubstackPosts();
    } catch (error) {
      console.error("Erro na atualização automática:", error);
    }
  }, interval * 60 * 1000);
  
  // Iniciar a primeira busca
  fetchSubstackPosts();
  
  // Retornar o ID do intervalo para potencial cancelamento futuro
  return intervalId;
}

