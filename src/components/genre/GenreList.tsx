"use client";

import Link from "next/link";
import DeleteGenreButton from "./DeleteGenreButton";

interface Genre {
  id: number;
  name: string;
}

interface GenreListProps {
  genres: Genre[];
}

export default function GenreList({ genres }: GenreListProps) {
  return (
    <ul className="space-y-4">
      {genres.map((genre) => (
        <li
          key={genre.id}
          className="p-4 border rounded flex items-center justify-between"
        >
          <span className="font-bold">{genre.name}</span>
          <div className="flex space-x-4">
            <Link
              href={`/genres/${genre.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <DeleteGenreButton id={genre.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
