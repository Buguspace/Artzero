
import { CategoryItemType } from "./CategoryItem";

export type SortOption = "latest" | "oldest" | "price-low" | "price-high";

export type Artwork = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  publishDate: string;
  beansCount: number;
};

export const getCategoryIcon = (category: string) => {
  return category;
};

export const getCategoryName = (category: string) => {
  switch (category) {
    case "books":
      return "书籍";
    case "art":
      return "艺术";
    case "music":
      return "音乐";
    case "video":
      return "视频";
    default:
      return category;
  }
};

export const formatPublishDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const convertUserArtworksToItems = (artworks: Artwork[]): CategoryItemType[] => {
  return artworks.map(artwork => ({
    id: artwork.id,
    title: artwork.title,
    author: "Me", // Since these are user's own artworks
    imageUrl: artwork.imageUrl,
    category: artwork.category,
    beansCount: artwork.beansCount,
    price: artwork.price,
    publishDate: artwork.publishDate
  }));
};

export const sortItems = (items: CategoryItemType[], sortBy: SortOption) => {
  switch (sortBy) {
    case "latest":
      return [...items].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    case "oldest":
      return [...items].sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
    case "price-low":
      return [...items].sort((a, b) => a.price - b.price);
    case "price-high":
      return [...items].sort((a, b) => b.price - a.price);
    default:
      return items;
  }
};
