import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const defaultSEO = {
  title: 'Espelho Invertido - Vieses e Narrativas sobre Contradições Ideológicas',
  description: 'Explore como o viés de confirmação molda nossa interpretação da realidade através de crônicas provocativas e análises dialéticas.',
  keywords: 'viés de confirmação, narrativas, contradições ideológicas, crônicas, Marx, análise política, reflexão crítica',
  ogImage: '/og-image.jpg',
  ogType: 'website'
};

export const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'article',
  canonical 
}: SEOHeadProps) => {
  const location = useLocation();
  
  const finalTitle = title ? `${title} | Espelho Invertido` : defaultSEO.title;
  const finalDescription = description || defaultSEO.description;
  const finalKeywords = keywords || defaultSEO.keywords;
  const finalOgImage = ogImage || defaultSEO.ogImage;
  const finalCanonical = canonical || `https://espelhoinvertido.com${location.pathname}`;

  useEffect(() => {
    // Atualizar título
    document.title = finalTitle;
    
    // Atualizar meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Meta tags básicas
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    
    // Open Graph
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', finalCanonical, true);
    updateMetaTag('og:site_name', 'Espelho Invertido', true);
    
    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalOgImage);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalCanonical);
    
    // Schema.org JSON-LD
    const schemaScript = document.getElementById('schema-org');
    if (schemaScript) {
      schemaScript.remove();
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Espelho Invertido",
      "description": finalDescription,
      "url": "https://espelhoinvertido.com",
      "author": {
        "@type": "Organization",
        "name": "Espelho Invertido"
      },
      "sameAs": [
        "https://espelhoinvertido.substack.com/",
        "https://www.youtube.com/@EspelhoInvertido-mirrorshards",
        "https://www.linkedin.com/in/espelhoinvertido/",
        "https://www.instagram.com/espe.lhoinvertido/",
        "https://www.tiktok.com/@espelhoinvertido"
      ]
    };
    
    const newSchemaScript = document.createElement('script');
    newSchemaScript.type = 'application/ld+json';
    newSchemaScript.id = 'schema-org';
    newSchemaScript.textContent = JSON.stringify(schema);
    document.head.appendChild(newSchemaScript);
    
  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, ogType, finalCanonical]);

  return null;
};