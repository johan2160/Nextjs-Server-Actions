import prisma from "@/lib/prisma";

export async function GET() {
  const authors = await prisma.author.findMany();
  return new Response(JSON.stringify(authors), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
