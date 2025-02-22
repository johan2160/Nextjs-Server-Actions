import { z } from "zod";

export const createGenreSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const updateGenreSchema = createGenreSchema.extend({
  id: z.coerce.number().min(1, "ID is required"),
});
