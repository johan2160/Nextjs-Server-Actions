import GenreList from "@/components/genre/GenreList";
import prisma from "@/lib/prisma";
import CreateGenreForm from "@/components/genre/CreateGenreForm";

export default async function GenresPage() {
  const genres = await prisma.genre.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Genres</h1>

      {/* Component to create a new genre */}
      <CreateGenreForm />

      {/* List of genres */}
      <GenreList genres={genres} />
    </div>
  );
}
