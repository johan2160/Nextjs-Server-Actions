"use server";

import prisma from "@/lib/prisma";
import { createAuthorSchema, updateAuthorSchema } from "@/schemas/author";

export async function createAuthor(data: unknown) {
  const validatedData = createAuthorSchema.parse(data);
  return await prisma.author.create({
    data: {
      name: validatedData.name,
      bio: validatedData.bio || null,
    },
  });
}

export async function updateAuthor(data: unknown) {
  const validatedData = updateAuthorSchema.parse(data);
  return await prisma.author.update({
    where: { id: validatedData.id },
    data: {
      name: validatedData.name,
      bio: validatedData.bio || null,
    },
  });
}

export async function deleteAuthor(id: number) {
  return await prisma.author.delete({
    where: { id },
  });
}
