import { z } from "zod";

// Schema for creating/updating active items (without id)
export const activeSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    status: z.enum(["active", "inactive", "pending", "completed"]).default("active"),
    priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
    category: z.string().optional(),
    tags: z.string().optional(),
    dueDate: z.string().optional(),
    isCompleted: z.boolean().default(false),
});

// Schema for active item with id (used for display)
export const activeWithIdSchema = activeSchema.extend({
    id: z.number(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
});

export type ActiveApiResponse = ActiveWithId & {
    createdAt: string;
    updatedAt: string;
};

export type ActiveSchema = z.infer<typeof activeSchema>;
export type ActiveWithId = z.infer<typeof activeWithIdSchema>;
