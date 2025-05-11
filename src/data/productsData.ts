// Define artwork type
export interface Artwork {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  publishDate: string;
  beansCount: number;
}

// Mock data for second-hand items
export const productsData = {
  "1": {
    id: 1,
    title: "水彩技法分享",
    author: "艺术家",
    authorAvatar: "/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png",
    price: 150,
    originalPrice: 300,
    description: "全新水彩技法教材，包含多种绘画技巧和实用教程。书内附有详细步骤图和示例作品，适合初学者和进阶者学习。只翻阅过几次，保存完好。",
    condition: "九成新",
    location: "美术学院北区",
    category: "art",
    beansCount: 45,
    publishDate: "2023-04-15",
    views: 237,
    images: [
      "/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png",
      "/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png",
      "/lovable-uploads/0f9d1c94-3adf-4464-8970-e47dc42ac26d.png"
    ]
  },
  "2": {
    id: 2,
    title: "绘画技巧课程",
    author: "画笔艺术",
    authorAvatar: "/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png",
    price: 80,
    originalPrice: 120,
    description: "二手绘画技巧教材，内含多种绘画风格和技法详解。书中有少量学习笔记，不影响阅读。适合想要快速提升绘画技巧的艺术爱好者。",
    condition: "八成新",
    location: "城市广场艺术中心",
    category: "art",
    beansCount: 32,
    publishDate: "2023-05-02",
    views: 168,
    images: [
      "/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png",
      "/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png"
    ]
  },
  "3": {
    id: 3,
    title: "设计理论探讨",
    author: "设计师小王",
    authorAvatar: "/lovable-uploads/0f9d1c94-3adf-4464-8970-e47dc42ac26d.png",
    price: 65,
    originalPrice: 95,
    description: "设计理论与实践指南，涵盖平面设计、UI/UX设计原则等内容。书内有精美插图和实用案例分析。轻微使用痕迹，内容完整。",
    condition: "八成新",
    location: "设计学院图书馆",
    category: "books",
    beansCount: 28,
    publishDate: "2023-04-28",
    views: 145,
    images: [
      "/lovable-uploads/0f9d1c94-3adf-4464-8970-e47dc42ac26d.png"
    ]
  },
  "4": {
    id: 4,
    title: "爵士乐基础",
    author: "音乐家",
    authorAvatar: "/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png",
    price: 200,
    originalPrice: 350,
    description: "爵士乐基础教程，包含理论知识和实践练习。书内附有音频资源二维码，可以扫码获取示范录音。书角有轻微折痕，不影响使用。",
    condition: "七成新",
    location: "音乐学院琴房",
    category: "music",
    beansCount: 52,
    publishDate: "2023-03-20",
    views: 213,
    images: [
      "/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png"
    ]
  },
  "5": {
    id: 5,
    title: "电影解说系列",
    author: "影评人",
    authorAvatar: "/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png",
    price: 120,
    originalPrice: 180,
    description: "电影分析与解说系列丛书，涵盖多种电影类型和经典作品解析。书中有详细的电影镜头分析和导演风格研究，适合电影爱好者和学习者。",
    condition: "九成新",
    location: "传媒大学影视楼",
    category: "video",
    beansCount: 37,
    publishDate: "2023-04-10",
    views: 192,
    images: [
      "/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png"
    ]
  }
};

// Mock comments data
export const mockComments = [
  {
    id: 1,
    author: "艺术爱好者",
    authorAvatar: "/lovable-uploads/adb68495-4038-4b42-82e8-5a95aba273d4.png",
    content: "这本水彩教材真的很棒，讲解很详细，适合初学者入门！",
    date: "2023-05-01"
  },
  {
    id: 2,
    author: "绘画学习者",
    authorAvatar: "/lovable-uploads/0f9d1c94-3adf-4464-8970-e47dc42ac26d.png",
    content: "请问这本书有详细的色彩理论部分吗？想深入学习水彩颜色搭配。",
    date: "2023-04-28"
  }
];
