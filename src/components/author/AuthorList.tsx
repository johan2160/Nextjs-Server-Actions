"use client";

import Link from "next/link";
import DeleteAuthorButton from "./DeleteAuthorButton";

interface Author {
  id: number;
  name: string;
  bio: string | null;
}

interface AuthorListProps {
  authors: Author[];
}

export default function AuthorList({ authors }: AuthorListProps) {
  return (
    <ul className="space-y-4">
      {authors.map((author) => (
        <li key={author.id} className="p-4 border rounded">
          <h3 className="text-lg font-bold">{author.name}</h3>
          {author.bio && <p className="mb-2">{author.bio}</p>}
          <div className="flex space-x-4">
            <Link
              href={`/authors/${author.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <DeleteAuthorButton id={author.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
