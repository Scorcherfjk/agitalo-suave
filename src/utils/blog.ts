import { getCollection } from "astro:content";

export type BlogType = "receta" | "bitacora" | "tecnica" | "tip";

export async function getPostsByType(type?: BlogType) {
  const blogPosts = await getCollection("blog");
  return blogPosts
    .filter((post) => !post.data.draft)
    .filter((post) => (type ? post.data.type === type : true))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
