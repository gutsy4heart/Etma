import { z } from "zod";

// Schema for creating/updating reviews (without id)
export const reviewSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
    rating: z.string().min(1, { message: "Rating is required" }),
});

// Schema for review with id (used for display)
export const reviewWithIdSchema = reviewSchema.extend({
    id: z.number(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
});

export type ReviewApiResponse = ReviewWithId & {
    createdAt: string;
    updatedAt: string;
  };
export type ReviewSchema = z.infer<typeof reviewSchema>;
export type ReviewWithId = z.infer<typeof reviewWithIdSchema>;
