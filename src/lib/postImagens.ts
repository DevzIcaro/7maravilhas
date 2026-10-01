import type { ImageMetadata } from "astro";

/**
 * Imagens do blog, indexadas pelo `id` da coleção `posts` (src/data/posts.json).
 * Post sem entrada aqui cai automaticamente no PlaceholderImage.
 */
export const imagensPosts: Record<string, ImageMetadata> = {};

export function imagemDoPost(id: string): ImageMetadata | undefined {
  return imagensPosts[id];
}
