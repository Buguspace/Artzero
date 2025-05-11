interface ValidationErrors {
  [key: string]: string;
}

export const validateArtworkForm = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.get('title')) {
    errors.title = '请输入作品名称';
  }
  
  if (!data.get('description')) {
    errors.description = '请输入作品描述';
  }
  
  const price = data.get('price');
  if (!price || Number(price) <= 0) {
    errors.price = '请输入有效的价格';
  }
  
  if (!data.get('category')) {
    errors.category = '请选择分类';
  }
  
  const images = data.getAll('image');
  if (images.length === 0) {
    errors.images = '请至少上传一张图片';
  }
  
  return errors;
};

export const validateFile = (file: File): string | null => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (file.size > MAX_SIZE) {
    return '文件大小不能超过5MB';
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return '只支持 JPG、PNG、GIF 格式的图片';
  }
  
  return null;
}; 
 