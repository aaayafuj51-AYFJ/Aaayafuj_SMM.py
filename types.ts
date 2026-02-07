
export enum ServiceCategory {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  FACEBOOK = 'Facebook',
  TWITTER = 'Twitter (X)',
}

export interface SMMService {
  id: string;
  name: string;
  category: ServiceCategory;
  pricePer1k: number;
  minOrder: number;
  maxOrder: number;
  description: string;
}

export interface SMMOrder {
  id: string;
  serviceId: string;
  serviceName: string;
  targetUrl: string;
  quantity: number;
  status: 'pending' | 'processing' | 'completed' | 'canceled';
  createdAt: string;
  cost: number;
}

export interface DashboardStats {
  totalSpent: number;
  activeOrders: number;
  completedOrders: number;
  balance: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
