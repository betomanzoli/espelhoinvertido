
import { SubstackPost } from '../substackService';

export const parseSubstackRSS = (xmlText: string): SubstackPost[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('XML parsing failed');
    }
    
    const items = xmlDoc.querySelectorAll('item');
    
    if (items.length === 0) {
      console.warn('Nenhum item encontrado no RSS');
      return [];
    }
    
    const posts: SubstackPost[] = [];
    
    items.forEach((item, index) => {
      try {
        const title = item.querySelector('title')?.textContent?.trim() || `Post ${index + 1}`;
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent?.trim() || '';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        const guid = item.querySelector('guid')?.textContent || `post-${Date.now()}-${index}`;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        const imgElement = tempDiv.querySelector('img');
        const coverImage = imgElement?.src || 
          `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80`;
        
        const cleanDescription = tempDiv.textContent || tempDiv.innerText || description;
        const truncatedDescription = cleanDescription.substring(0, 300) + 
          (cleanDescription.length > 300 ? '...' : '');
        
        const slug = link.split('/').pop() || 
          title.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        
        posts.push({
          id: slug,
          title: title,
          subtitle: cleanDescription.substring(0, 100) + (cleanDescription.length > 100 ? '...' : ''),
          description: truncatedDescription,
          coverImage,
          publishedAt: new Date(pubDate).toISOString(),
          slug,
          url: link,
          content: cleanDescription
        });
      } catch (itemError) {
        console.warn(`Erro ao processar item ${index}:`, itemError);
      }
    });
    
    return posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Erro ao fazer parse do RSS:', error);
    throw error;
  }
};
