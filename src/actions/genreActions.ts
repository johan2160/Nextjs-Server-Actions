"use server";

import prisma from "@/lib/prisma";
import { createGenreSchema, updateGenreSchema } from "@/schemas/genre";

export async function createGenre(data: unknown) {
  const validatedData = createGenreSchema.parse(data);
  return await prisma.genre.create({
    data: validatedData,
  });
}

export async function updateGenre(data: unknown) {
  const validatedData = updateGenreSchema.parse(data);
  return await prisma.genre.update({
    where: { id: validatedData.id },
    data: { name: validatedData.name },
  });
}

export async function deleteGenre(id: number) {
  return await prisma.genre.delete({
    where: { id },
  });
}
