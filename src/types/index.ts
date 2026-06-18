export interface ContentSection {
  heading: string;
  paragraphs: string[];
  images: string[];
}

export interface Project {
  slug: string;
  category: string;
  title: string;
  description: string;
  cover: string;
  year: string;
  industry: string;
  client: string;
  duration: string;
  featured: boolean;
  sections: ContentSection[];
}

export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  cover: string;
  pinned: boolean;
  sections: ContentSection[];
}

export interface NavLink {
  label: string;
  href: string;
}
