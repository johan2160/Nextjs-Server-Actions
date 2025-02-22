"use client";

import { deleteAuthor } from "@/actions/authorActions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface DeleteAuthorButtonProps {
  id: number;
}

export default function DeleteAuthorButton({ id }: DeleteAuthorButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this author?")) {
      startTransition(async () => {
        await deleteAuthor(id);
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
