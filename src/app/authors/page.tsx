import prisma from "@/lib/prisma";
import CreateAuthorForm from "@/components/author/CreateAuthorForm";
import AuthorList from "@/components/author/AuthorList";

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>

      <CreateAuthorForm />

      <AuthorList authors={authors} />
    </div>
  );
}
