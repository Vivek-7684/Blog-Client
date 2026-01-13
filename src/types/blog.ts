export interface Blog {
  blog_id: number;
  title: string;
  content: string;
  image_url: string;
  summary?: string;
  quote?: string;
  tags?: string;
  views?: number;
  created_at?: string;

  // relations (optional)
  sections?: any[];
  relatedPosts?: Blog[];
  previousPost?: Blog;
  nextPost?: Blog;

  author?: string;
  occupation?: string;
  author_desc?: string;
  author_image?: string;
}
