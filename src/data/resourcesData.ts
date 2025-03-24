
export type Resource = {
  title: string;
  author?: string;
  year?: string;
  description?: string;
  url?: string;
};

// Categorias de recursos
export const primaryWorks: Resource[] = [
  { title: "O Capital (3 volumes)", author: "Karl Marx", year: "1867-1894", description: "Análise abrangente do sistema capitalista." },
  { title: "A Ideologia Alemã", author: "Karl Marx e Friedrich Engels", year: "1846", description: "Crítica da filosofia alemã pós-hegeliana." },
  { title: "Contribuição à Crítica da Economia Política", author: "Karl Marx", year: "1859", description: "Fundamentos da teoria econômica marxista." },
  { title: "Estado e Revolução", author: "Vladimir Lenin", year: "1917", description: "Análise do Estado e sua relação com a revolução." },
];

export const contemporaryAnalyses: Resource[] = [
  { title: "Realismo Capitalista: Não Há Alternativa?", author: "Mark Fisher", year: "2009", description: "Análise da percepção do capitalismo como único sistema viável." },
  { title: "Capitalismo de Plataforma", author: "Nick Srnicek", year: "2016", description: "Examina o surgimento das plataformas digitais como novo modelo de negócios." },
  { title: "O Novo Espírito do Capitalismo", author: "Luc Boltanski e Eve Chiapello", year: "1999", description: "Estudo sobre as transformações ideológicas do capitalismo." },
  { title: "Comunismo Ácido", author: "Mark Fisher e Jeremy Gilbert", year: "2013", description: "Propõe uma reimaginação progressista do futuro." },
];

export const digitalApplications: Resource[] = [
  { title: "Capitalismo de Vigilância", author: "Shoshana Zuboff", year: "2019", description: "Análise do modelo de negócios baseado em dados e vigilância." },
  { title: "Tecnologia do Oprimido", author: "Ramesh Srinivasan", year: "2019", description: "Examina o impacto da tecnologia em comunidades marginalizadas." },
  { title: "Comunismo: A Grande Substituição", author: "Slavoj Žižek", year: "2019", description: "Reflexões sobre comunismo na era das crises globais." },
];

export const onlineResources: Resource[] = [
  { title: "Marxists Internet Archive", description: "Biblioteca completa de textos marxistas", url: "https://www.marxists.org/" },
  { title: "Jacobin Magazine", description: "Análises contemporâneas de esquerda", url: "https://jacobin.com/" },
  { title: "Monthly Review", description: "Revista socialista independente", url: "https://monthlyreview.org/" },
];

export const podcasts: Resource[] = [
  { title: "Economic Update", author: "Richard Wolff", description: "Análise econômica semanal sob perspectiva marxista", url: "https://economicupdate.libsyn.com/" },
  { title: "Revolutionary Left Radio", description: "Discussões sobre teoria e história radical", url: "https://revolutionaryleftradio.libsyn.com/" },
  { title: "The Dig (Jacobin Radio)", description: "Entrevistas aprofundadas sobre política e economia", url: "https://thedigradio.com/" },
];

export const youtubeChannels: Resource[] = [
  { title: "Philosophy Tube", description: "Episódios sobre filosofia política, incluindo Marx", url: "https://www.youtube.com/c/thephilosophytube" },
  { title: "Contrapoints", description: "Análises culturais sob perspectiva de esquerda", url: "https://www.youtube.com/c/contrapoints" },
  { title: "Jacobin", description: "Documentários e entrevistas", url: "https://www.youtube.com/c/JacobinMag" },
];

export const documentaries: Resource[] = [
  { title: "Marx Reloaded", year: "2011", description: "Documentário sobre a relevância de Marx na era pós-2008" },
  { title: "O Jovem Karl Marx", year: "2017", description: "Filme biográfico sobre os primeiros anos de Marx" },
  { title: "O Capital no Século XXI", year: "2019", description: "Adaptação do livro de Thomas Piketty" },
  { title: "American Factory", year: "2019", description: "Documenta o choque cultural em uma fábrica chinesa nos EUA" },
];

export const fictionalFilms: Resource[] = [
  { title: "Bacurau", year: "2019", description: "Alegoria sobre resistência comunitária e neocolonialismo" },
  { title: "Coringa", year: "2019", description: "Crítica social sobre desigualdade e abandono institucional" },
  { title: "Parasita", year: "2019", description: "Sátira sobre desigualdade de classes" },
  { title: "Relatos Selvagens", year: "2014", description: "Antologia sobre injustiça social e revolta individual" },
];

export const series: Resource[] = [
  { title: "Mr. Robot", description: "Uma crítica ao capitalismo financeiro" },
  { title: "Years and Years", description: "Impactos do neoliberalismo na vida familiar" },
];

export const criticalApproaches: Resource[] = [
  { title: "A Sociedade Aberta e Seus Inimigos", author: "Karl Popper", year: "1945", description: "Crítica filosófica ao historicismo e totalitarismo" },
  { title: "O Caminho da Servidão", author: "Friedrich Hayek", year: "1944", description: "Crítica ao planejamento centralizado e socialismo" },
  { title: "O Fim da História e o Último Homem", author: "Francis Fukuyama", year: "1992", description: "Tese sobre o triunfo da democracia liberal" },
];
