import prisma from "@/lib/prisma";

export async function GET() {
  // Fetch all genres along with the books associated with each genre.
  const genres = await prisma.genre.findMany({
    include: {
      books: true,
    },
  });

  return new Response(JSON.stringify(genres), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
