import { useEffect, useState } from "react";

interface Author {
  id: number;
  name: string;
}

export default function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch("/api/authors");
        if (!res.ok) throw new Error("Failed to fetch authors");
        const data = await res.json();
        setAuthors(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return { authors, isLoading, error };
}
