"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateGenreSchema } from "@/schemas/genre";
import type { z } from "zod";
import { updateGenre } from "@/actions/genreActions";

type FormData = z.infer<typeof updateGenreSchema>;

interface EditGenreFormProps {
  genre: {
    id: number;
    name: string;
  };
}

export default function EditGenreForm({ genre }: EditGenreFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(updateGenreSchema),
    defaultValues: {
      id: genre.id,
      name: genre.name,
    },
  });

  async function onSubmit(data: FormData) {
    try {
      startTransition(async () => {
        await updateGenre(data);
        router.push("/genres");
      });
    } catch (err: any) {
      console.error("Error updating genre:", err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded dark:border-gray-700">
      <input type="hidden" {...register("id")} />
      <div className="mb-2">
        <label className="block font-medium mb-1 dark:text-gray-200">Name:</label>
        <input
          type="text"
          {...register("name")}
          className="border p-2 w-full rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-600"
      >
        {isSubmitting || isPending ? "Updating..." : "Update Genre"}
      </button>
    </form>
  );
}
