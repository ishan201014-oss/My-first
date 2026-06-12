export type Category = 'Anime' | 'Fantasy' | 'Realistic' | 'Minecraft' | 'Logos' | 'Wallpapers' | 'Gaming' | 'Photography' | 'Cinematic' | 'Sci-Fi';

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  followers?: number;
  following?: number;
  badges?: string[];
  createdAt: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: Category;
  authorId: string;
  authorName: string;
  likes: number;
  favorites: number;
  views: number;
  tags: string[];
  createdAt: string;
  featured?: boolean;
  promptOfDay?: boolean;
}

export interface PromptFilters {
  search?: string;
  category?: Category | 'All';
  sort?: 'trending' | 'newest' | 'popular' | 'views';
}
