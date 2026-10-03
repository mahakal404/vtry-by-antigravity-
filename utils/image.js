export const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const loadImage = (src) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.src = src;
});
