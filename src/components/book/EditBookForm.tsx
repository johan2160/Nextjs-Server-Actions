"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBookSchema } from "@/schemas/book";
import type { z } from "zod";
import { updateBook } from "@/actions/bookActions";
import useAuthors from "@/hooks/useAuthors"; 

type FormData = z.infer<typeof updateBookSchema>;

interface Book {
  id: number;
  title: string;
  publishedAt: Date | any;
  description: string | null;
  author: {
    id: number;
    name: string;
  };
}

interface EditBookFormProps {
  book: Book;
}

export default function EditBookForm({ book }: EditBookFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { authors, isLoading, error } = useAuthors();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      id: book.id,
      title: book.title,
      authorId: book.author.id,
      publishedAt: book.publishedAt.toISOString().split("T")[0],
      description: book.description || "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      startTransition(async () => {
        await updateBook(data);
        router.push("/books");
      });
    } catch (err: any) {
      console.error("Update error:", err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      <input type="hidden" {...register("id")} />

      <div className="mb-2">
        <label className="block font-medium mb-1">Title:</label>
        <input
          type="text"
          {...register("title")}
          className="border p-2 w-full bg-gray-800 text-white border-gray-600"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">Author:</label>
        <select
          {...register("authorId")}
          disabled={isLoading || !!error}
          className="border p-2 w-full bg-gray-800 text-white border-gray-600"
        >
          <option value={book.author.id}>{book.author.name}</option>
          {authors
            .filter((author) => author.id !== book.author.id)
            .map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
        </select>
        {errors.authorId && (
          <p className="text-red-500 text-sm mt-1">{errors.authorId.message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm mt-1">
            Error fetching authors: {error.message}
          </p>
        )}
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">Published Date:</label>
        <input
          type="date"
          {...register("publishedAt")}
          className="border p-2 w-full bg-gray-800 text-white border-gray-600"
        />
        {errors.publishedAt && (
          <p className="text-red-500 text-sm mt-1">
            {errors.publishedAt.message}
          </p>
        )}
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">Description:</label>
        <textarea
          {...register("description")}
          className="border p-2 w-full bg-gray-800 text-white border-gray-600"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {isSubmitting || isPending ? "Updating..." : "Update Book"}
      </button>
    </form>
  );
}
