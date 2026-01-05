import { defineCollection, z } from "astro:content";

const works = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    buttonLink: z.string().url().optional(),
    videos: z
      .array(
        z.object({
          embedUrl: z.string().url().optional(),
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

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

const photos = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    photo: z.string(),
    alt: z.string(),
  }),
});

const media = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    fileUrl: z.string().optional(),
    file: z.string().optional(),
    alt: z.string(),
  }),
});

const about = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
    awards: z
      .array(
        z.object({
          title: z.string(),
          year: z.number().int().optional(),
          description: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { works, events, news, photos, media, about };