// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  gender: 'male' | 'female' | 'other';
  birthday: string;
  school: string;
  coffeeBeans: number;
  createdAt: string;
  updatedAt: string;
}

// 地址相关类型
export interface Address {
  id: string;
  type: 'shipping' | 'return';
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// 咖啡豆记录类型
export interface CoffeeRecord {
  id: string;
  type: 'recharge' | 'tip' | 'reward';
  amount: number;
  description: string;
  timestamp: string;
}

// 隐私设置类型
export interface PrivacySettings {
  showProfile: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  showLocation: boolean;
  allowNotifications: boolean;
}

// 通知设置类型
export interface NotificationSettings {
  systemNotifications: boolean;
  messageNotifications: boolean;
  likeNotifications: boolean;
  commentNotifications: boolean;
  followNotifications: boolean;
  emailNotifications: boolean;
}

// 缓存信息类型
export interface CacheInfo {
  type: string;
  size: number;
  description: string;
}

// FAQ类型
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

// API响应类型
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 