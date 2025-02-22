"use client";

import Link from "next/link";
import DeleteBookButton from "./DeleteBookButton";

interface Book {
  id: number;
  title: string;
  publishedAt: Date;
  description: string | null;
  author: {
    id: number;
    name: string;
  };
}

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li key={book.id} className="p-4 border rounded">
          <h3 className="text-lg font-bold">{book.title}</h3>
          <p className="text-sm text-gray-600">
            Author: {book.author.name} | Published:{" "}
            {new Date(book.publishedAt).toDateString()}
          </p>
          {book.description && <p className="mt-2">{book.description}</p>}
          <div className="flex space-x-4 mt-2">
            <Link
              href={`/books/${book.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <DeleteBookButton id={book.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
