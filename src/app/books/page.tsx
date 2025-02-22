import BookList from "@/components/book/BookList";
import CreateBookForm from "@/components/book/CreateBookForm";
import prisma from "@/lib/prisma";

export default async function BooksPage() {
  // Fetch books with their associated author
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      {/* Component to create a new book */}
      <CreateBookForm />
      {/* List of books */}
      <BookList books={books} />
    </div>
  );
}
