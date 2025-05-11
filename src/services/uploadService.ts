interface UploadProgress {
  loaded: number;
  total: number;
}

interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
}

export const uploadFile = async (
  file: File,
  options: UploadOptions = {}
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const xhr = new XMLHttpRequest();
    
    // 设置上传进度监听
    if (options.onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          options.onProgress?.({
            loaded: event.loaded,
            total: event.total,
          });
        }
      });
    }

    // 创建上传 Promise
    const uploadPromise = new Promise<string>((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.url);
        } else {
          reject(new Error('上传失败'));
        }
      };
      xhr.onerror = () => reject(new Error('网络错误'));
    });

    // 开始上传
    xhr.open('POST', '/api/upload');
    xhr.send(formData);

    return await uploadPromise;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('文件上传失败，请重试');
  }
};

export const uploadMultipleFiles = async (
  files: File[],
  options: UploadOptions = {}
): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadFile(file, options));
  return Promise.all(uploadPromises);
}; 
 