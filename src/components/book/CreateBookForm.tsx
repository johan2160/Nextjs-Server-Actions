"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBookSchema } from "@/schemas/book";
import type { z } from "zod";
import { createBook } from "@/actions/bookActions";

type FormData = z.infer<typeof createBookSchema>;

interface Author {
  id: number;
  name: string;
}

export default function CreateBookForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createBookSchema),
  });

  useEffect(() => {
    async function fetchAuthors() {
      const res = await fetch("/api/authors");
      const data = await res.json();
      setAuthors(data);
    }
    fetchAuthors();
  }, []);

  async function onSubmit(data: FormData) {
    try {
      startTransition(async () => {
        await createBook(data);
        router.refresh();
        reset();
      });
    } catch (err: any) {
      console.error("Creation error:", err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 p-4 border rounded dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">Create New Book</h2>

      <div className="mb-2">
        <input
          type="text"
          {...register("title")}
          placeholder="Book Title"
          className="border p-2 w-full rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder-gray-400 dark:placeholder-gray-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-2">
        <select 
          {...register("authorId")} 
          className="border p-2 w-full rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
        >
          <option value="">Select an Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.authorId && (
          <p className="text-red-500 text-sm mt-1">{errors.authorId.message}</p>
        )}
      </div>

      <div className="mb-2">
        <input
          type="date"
          {...register("publishedAt")}
          className="border p-2 w-full rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
        />
        {errors.publishedAt && (
          <p className="text-red-500 text-sm mt-1">
            {errors.publishedAt.message}
          </p>
        )}
      </div>

      <div className="mb-2">
        <textarea
          {...register("description")}
          placeholder="Description"
          className="border p-2 w-full rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder-gray-400 dark:placeholder-gray-500"
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600"
      >
        {isSubmitting || isPending ? "Creating..." : "Create Book"}
      </button>
    </form>
  );
}
