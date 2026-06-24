export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  updated?: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  relatedToolSlug?: string;
  relatedTools?: string[];
  relatedPosts?: string[];
  faqs: BlogFaq[];
  noindex?: boolean;
}
