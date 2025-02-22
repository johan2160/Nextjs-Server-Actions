"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createGenreSchema } from "@/schemas/genre";
import type { z } from "zod";
import { createGenre } from "@/actions/genreActions";

type FormData = z.infer<typeof createGenreSchema>;

export default function CreateGenreForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createGenreSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      startTransition(async () => {
        await createGenre(data);
        router.refresh();
        reset();
      });
    } catch (err: any) {
      console.error("Error creating genre:", err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 p-4 border rounded dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">Create New Genre</h2>
      <div className="mb-2">
        <input
          type="text"
          {...register("name")}
          placeholder="Genre Name"
          className="border p-2 w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 dark:text-red-400">{errors.name.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-gray-600"
      >
        {isSubmitting || isPending ? "Creating..." : "Create Genre"}
      </button>
    </form>
  );
}
