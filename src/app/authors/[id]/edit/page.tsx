import EditAuthorForm from "@/components/author/EditAuthorForm";
import prisma from "@/lib/prisma";

export default async function EditAuthorPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const authorId = Number(params.id);
  const author = await prisma.author.findUnique({
    where: { id: authorId },
  });

  if (!author) return <div>Author not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Author</h1>
      <EditAuthorForm author={author} />
    </div>
  );
}
