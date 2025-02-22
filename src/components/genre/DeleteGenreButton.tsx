"use client";

import { deleteGenre } from "@/actions/genreActions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface DeleteGenreButtonProps {
  id: number;
}

export default function DeleteGenreButton({ id }: DeleteGenreButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this genre?")) {
      startTransition(async () => {
        await deleteGenre(id);
        router.refresh();
      });
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:underline"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
