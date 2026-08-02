import type { CollectionEntry } from "astro:content";
import { SITE_TITLE, SOCIAL_LINKS, CATEGORY_LINKS } from "../consts";

export function getCategoryLink(
  category: string,
): { label: string; url: string } | undefined {
  return CATEGORY_LINKS[category as keyof typeof CATEGORY_LINKS];
}

export function getPostJsonLd(
  post: CollectionEntry<"blog">,
  siteUrl: URL,
): { jsonLd: string; breadcrumbJsonLd: string } {
  const { title, date, updated, excerpt, tags, type, imageUrl, headerImage } =
    post.data;
  const ingredients = post.data.ingredients;
  const steps = post.data.steps;
  const isRecipe =
    type === "receta" && !!ingredients?.length && !!steps?.length;

  const postUrl = new URL(`/blog/${post.id}`, siteUrl).toString();
  const [category] = post.id.split("/");
  const categoryLink = getCategoryLink(category);

  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: new URL("/", siteUrl).toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLink?.label ?? "Blog",
        item: new URL(categoryLink?.url ?? "/blog", siteUrl).toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: postUrl,
      },
    ],
  });

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": isRecipe ? "Recipe" : "BlogPosting",
    headline: title,
    description: excerpt,
    image: [headerImage ?? imageUrl],
    url: postUrl,
    datePublished: date.toISOString(),
    dateModified: updated.toISOString(),
    author: { "@type": "Person", name: SITE_TITLE },
    ...(isRecipe
      ? {
          name: title,
          recipeCategory: "Cóctel",
          recipeCuisine: "Cócteles",
          recipeIngredient: ingredients,
          recipeInstructions: steps?.map((step) => ({
            "@type": "HowToStep",
            text: step,
          })),
        }
      : {}),
    keywords: tags.join(", "),
  });

  return { jsonLd, breadcrumbJsonLd };
}

export function getSiteJsonLd(siteUrl: URL): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_TITLE,
        url: siteUrl.toString(),
        logo: new URL("/favicon.svg", siteUrl).toString(),
        sameAs: SOCIAL_LINKS.map((link) => link.url),
      },
      {
        "@type": "WebSite",
        name: SITE_TITLE,
        url: siteUrl.toString(),
      },
    ],
  });
}

export function getPersonJsonLd(siteUrl: URL): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_TITLE,
    url: new URL("/acerca", siteUrl).toString(),
    sameAs: SOCIAL_LINKS.map((link) => link.url),
  });
}
