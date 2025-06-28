
import { SubstackPost } from '../substackService';

class SubstackCache {
  private posts: SubstackPost[] = [];
  private lastFetchTime = 0;
  private isLoading = false;
  private failureCount = 0;
  
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutos
  private readonly MAX_RETRIES = 3;
  
  get cachedPosts() { return [...this.posts]; }
  get loading() { return this.isLoading; }
  get lastUpdate() { return this.lastFetchTime; }
  
  isExpired(): boolean {
    return Date.now() - this.lastFetchTime > this.CACHE_DURATION;
  }
  
  canRetry(): boolean {
    return this.failureCount < this.MAX_RETRIES;
  }
  
  setPosts(posts: SubstackPost[]) {
    this.posts = posts;
    this.lastFetchTime = Date.now();
    this.failureCount = 0;
  }
  
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
  
  incrementFailure() {
    this.failureCount++;
  }
  
  reset() {
    this.failureCount = 0;
  }
}

export const cache = new SubstackCache();
