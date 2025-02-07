"use client"
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {/* Add your search results logic here */}
      <p>Display search results based on the query: {query}</p>
    </div>
  );
}