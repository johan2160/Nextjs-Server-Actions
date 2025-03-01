import prisma from "@/lib/prisma";
import EditGenreForm from "@/components/genre/EditGenreForm";

export default async function EditGenrePage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const genre = await prisma.genre.findUnique({
    where: { id: Number(params.id) },
  });

  if (!genre) {
    return <div>Genre not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Genre</h1>
      <EditGenreForm genre={genre} />
    </div>
  );
}
