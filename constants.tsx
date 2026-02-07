
import { SMMService, ServiceCategory, DashboardStats } from './types';

export const INITIAL_SERVICES: SMMService[] = [
  {
    id: 'ig-1',
    name: 'Instagram High-Retention Followers',
    category: ServiceCategory.INSTAGRAM,
    pricePer1k: 2.50,
    minOrder: 100,
    maxOrder: 50000,
    description: 'Real-looking accounts with profile pictures and posts. 30-day refill guarantee.'
  },
  {
    id: 'tt-1',
    name: 'TikTok Video Likes (Instant)',
    category: ServiceCategory.TIKTOK,
    pricePer1k: 0.85,
    minOrder: 500,
    maxOrder: 100000,
    description: 'Instant delivery likes for viral boosting.'
  },
  {
    id: 'yt-1',
    name: 'YouTube Watch Time (4000 Hours Package)',
    category: ServiceCategory.YOUTUBE,
    pricePer1k: 45.00,
    minOrder: 1000,
    maxOrder: 4000,
    description: 'Safe for monetization. High retention views to reach 4k hours.'
  },
  {
    id: 'fb-1',
    name: 'Facebook Page Likes + Followers',
    category: ServiceCategory.FACEBOOK,
    pricePer1k: 5.20,
    minOrder: 200,
    maxOrder: 20000,
    description: 'Grow your business page authority with organic-looking likes.'
  },
  {
    id: 'tw-1',
    name: 'Twitter Retweets (Organic Flow)',
    category: ServiceCategory.TWITTER,
    pricePer1k: 3.10,
    minOrder: 100,
    maxOrder: 10000,
    description: 'Stable retweets to increase tweet visibility.'
  }
];

export const INITIAL_STATS: DashboardStats = {
  totalSpent: 1240.55,
  activeOrders: 4,
  completedOrders: 142,
  balance: 45.20
};
