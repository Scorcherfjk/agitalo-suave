export interface RelatedPost {
  id: string;
  data: { draft?: boolean; date: Date };
}

export function getRelatedPosts<T extends RelatedPost>(
  posts: T[],
  currentId: string,
  max: number,
): T[] {
  return posts
    .filter((post) => !post.data.draft)
    .filter((post) => post.id !== currentId)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, max);
}
