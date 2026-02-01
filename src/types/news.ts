export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  publishedAt: string;
  source: string;
  category: NewsCategory;
  readTime: number;
  featured?: boolean;
}

export type NewsCategory = 
  | 'movies' 
  | 'tv-shows' 
  | 'celebrities' 
  | 'awards' 
  | 'trailers' 
  | 'industry';

export const NEWS_CATEGORIES: { value: NewsCategory; label: string }[] = [
  { value: 'movies', label: 'Movies' },
  { value: 'tv-shows', label: 'TV Shows' },
  { value: 'celebrities', label: 'Celebrities' },
  { value: 'awards', label: 'Awards' },
  { value: 'trailers', label: 'Trailers' },
  { value: 'industry', label: 'Industry' },
];