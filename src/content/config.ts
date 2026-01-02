import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders"; // zostaje dla articles
import { reference } from "astro:content";

// 1) Twoje istniejące articles (bez zmian)
const articles = defineCollection({
  loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      cover: image(),
      coverAlt: z.string(),
      title: z.string(),
      slug: z.string(),
      snippet: z.string(),
      category: z.string(),
      pubDate: z.coerce.date(),
      readingDuration: z.number(),
      originalLink: z.string().url(),
      isDraft: z.boolean().default(false),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default("Retro Rocket Team"),
      relatedArticles: z.array(reference("articles")).optional(),
    }),
});

// 2) Decap: works
const works = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    buttonLink: z.string().url().optional(),
    videos: z
      .array(
        z.object({
          embedUrl: embedUrl: z.string().url().optional(),
          videoFile: z.string().optional(),
        })
      )
      .optional(),
    audio: z
      .object({
        embedUrl: z.string().url().optional(),
        audioFile: z.string().optional(),
      })
      .optional(),
  }),
});

// 3) Decap: events
const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

// 4) Decap: news
const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

// 5) Decap: photos
const photos = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    photo: z.string(),
    alt: z.string(),
  }),
});

// 6) Decap: media
const media = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    fileUrl: z.string().optional(),
    file: z.string().optional(),
    alt: z.string(),
  }),
});

export const collections = { articles, works, events, news, photos, media };