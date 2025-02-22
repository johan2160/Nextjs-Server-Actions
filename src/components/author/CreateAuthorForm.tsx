"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createAuthorSchema } from "@/schemas/author";
import type { z } from "zod";
import { createAuthor } from "@/actions/authorActions";

type FormData = z.infer<typeof createAuthorSchema>;

export default function CreateAuthorForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createAuthorSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      startTransition(async () => {
        await createAuthor(data);
        router.refresh();
        reset();
      });
    } catch (err: any) {
      console.error("Creation error:", err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Create New Author</h2>
      <div className="mb-2">
        <input
          type="text"
          {...register("name")}
          placeholder="Author Name"
          className="border p-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-2">
        <textarea
          {...register("bio")}
          placeholder="Author Bio"
          className="border p-2 w-full"
        />
        {errors.bio && (
          <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSubmitting || isPending ? "Creating..." : "Create Author"}
      </button>
    </form>
  );
}
