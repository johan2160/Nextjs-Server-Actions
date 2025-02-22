import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authorId: z.coerce.number().min(1, "Author is required"),
  publishedAt: z.coerce.date({
    required_error: "Publication date is required",
    invalid_type_error: "Invalid date format",
  }),
  description: z.string().optional(),
});

export const updateBookSchema = createBookSchema.extend({
  id: z.coerce.number().min(1, "ID is required"),
});
