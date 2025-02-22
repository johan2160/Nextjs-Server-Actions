import prisma from "@/lib/prisma";

export async function GET() {
  // Fetch all books with their associated author and genres.
  const books = await prisma.book.findMany({
    include: {
      author: true,
      genres: true,
    },
  });

  return new Response(JSON.stringify(books), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
