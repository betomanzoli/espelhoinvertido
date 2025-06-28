
import { SubstackPost } from '../substackService';
import { parseSubstackRSS } from './parser';

export async function fetchWithProxy(proxyUrl: string): Promise<SubstackPost[]> {
  const rssUrl = 'https://espelhoinvertido.substack.com/feed';
  const url = proxyUrl + encodeURIComponent(rssUrl);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/rss+xml, application/xml, text/xml',
      'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)'
    },
    signal: AbortSignal.timeout(10000)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const xmlText = await response.text();
  return parseSubstackRSS(xmlText);
}

export async function fetchDirect(): Promise<SubstackPost[]> {
  const response = await fetch('https://espelhoinvertido.substack.com/feed', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/rss+xml, application/xml, text/xml'
    },
    signal: AbortSignal.timeout(8000)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const xmlText = await response.text();
  return parseSubstackRSS(xmlText);
}
