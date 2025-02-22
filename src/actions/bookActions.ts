"use server";

import prisma from "@/lib/prisma";
import { createBookSchema, updateBookSchema } from "@/schemas/book";

export async function createBook(data: unknown) {
  const validatedData = createBookSchema.parse(data);
  return await prisma.book.create({
    data: {
      title: validatedData.title,
      authorId: validatedData.authorId,
      publishedAt: validatedData.publishedAt,
      description: validatedData.description || null,
    },
  });
}

export async function updateBook(data: unknown) {
  const validatedData = updateBookSchema.parse(data);
  return await prisma.book.update({
    where: { id: validatedData.id },
    data: {
      title: validatedData.title,
      authorId: validatedData.authorId,
      publishedAt: validatedData.publishedAt,
      description: validatedData.description || null,
    },
  });
}

export async function deleteBook(id: number) {
  return await prisma.book.delete({
    where: { id },
  });
}
