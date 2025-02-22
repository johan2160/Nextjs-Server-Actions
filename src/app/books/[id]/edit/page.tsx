import EditBookForm from "@/components/book/EditBookForm";
import prisma from "@/lib/prisma";

export default async function EditBookPage({
  params,
}: {
  params: { id: string };
}) {
  const bookId = Number(params.id);
  // Fetch the book and include its author details
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { author: true },
  });

  if (!book) return <div>Book not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <EditBookForm book={book} />
    </div>
  );
}
