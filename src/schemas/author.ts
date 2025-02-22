import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
});

export const updateAuthorSchema = createAuthorSchema.extend({
  id: z.coerce.number().min(1, "ID is required"),
});
