export function getRandomImage(images: string[]): string {
  if (!images || images.length === 0) return '';
  return images[Math.floor(Math.random() * images.length)];
}
