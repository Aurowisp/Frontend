export type ProductStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'OFFLINE';

export interface SellerInfo {
  id: number;
  name: string;
  avatar: string;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  category: string;
  image_url: string;
  status: ProductStatus;
  location?: string;
  seller: SellerInfo;
  time_ago: string;
  created_at?: string;
}

export type ForumTagType = 'blue' | 'green' | 'orange' | 'purple';

export interface ForumPost {
  id: number;
  title: string;
  summary: string;
  content?: string;
  tag: string;
  tagType: ForumTagType;
  image_url: string;
  author: {
    name: string;
    avatar: string;
  };
  comment_count: number;
  created_date: string;
  likes_count?: number;
}

export interface FeatureEntry {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  theme: 'green' | 'blue';
  route: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}
