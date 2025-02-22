"use client";

import { deleteBook } from "@/actions/bookActions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface DeleteBookButtonProps {
  id: number;
}

export default function DeleteBookButton({ id }: DeleteBookButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this book?")) {
      startTransition(async () => {
        await deleteBook(id);
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
