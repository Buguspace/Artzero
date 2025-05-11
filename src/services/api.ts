import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 用户相关API
export const userApi = {
  // 个人信息
  updateProfile: (data: any) => api.put('/user/profile', data),
  updateAvatar: (formData: FormData) => api.put('/user/avatar', formData),
  updateBio: (bio: string) => api.put('/user/bio', { bio }),
  updateGender: (gender: string) => api.put('/user/gender', { gender }),
  updateBirthday: (birthday: string) => api.put('/user/birthday', { birthday }),
  updateSchool: (school: string) => api.put('/user/school', { school }),

  // 账号安全
  updatePassword: (data: { oldPassword: string; newPassword: string }) =>
    api.put('/user/password', data),
  updateEmail: (data: { email: string; code: string }) =>
    api.put('/user/email', data),
  updatePhone: (data: { phone: string; code: string }) =>
    api.put('/user/phone', data),
  deleteAccount: (password: string) => api.delete('/user', { data: { password } }),

  // 地址管理
  getAddresses: (type: 'shipping' | 'return') => api.get(`/addresses/${type}`),
  addAddress: (type: 'shipping' | 'return', data: any) =>
    api.post(`/addresses/${type}`, data),
  updateAddress: (type: 'shipping' | 'return', id: string, data: any) =>
    api.put(`/addresses/${type}/${id}`, data),
  deleteAddress: (type: 'shipping' | 'return', id: string) =>
    api.delete(`/addresses/${type}/${id}`),
  setDefaultAddress: (type: 'shipping' | 'return', id: string) =>
    api.put(`/addresses/${type}/${id}/default`),

  // 咖啡豆
  getCoffeeBeans: () => api.get('/coffee-beans'),
  recharge: (amount: number) => api.post('/coffee-beans/recharge', { amount }),
  getRecords: () => api.get('/coffee-beans/records'),

  // 设置
  getSettings: () => api.get('/settings'),
  updatePrivacySettings: (settings: any) =>
    api.put('/settings/privacy', settings),
  updateNotificationSettings: (settings: any) =>
    api.put('/settings/notifications', settings),
  clearCache: (type?: string) => api.delete('/cache', { data: { type } }),

  // 验证码
  sendVerificationCode: (type: 'email' | 'phone', target: string) =>
    api.post('/verification-code', { type, target }),
};

// 帮助中心API
export const helpApi = {
  getFaqs: () => api.get('/help/faqs'),
  searchFaqs: (query: string) => api.get(`/help/faqs/search?q=${query}`),
  contactSupport: (data: { subject: string; message: string }) =>
    api.post('/help/contact', data),
};

export default api; 