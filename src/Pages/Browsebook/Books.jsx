// Pages/Books.jsx
import { useEffect, useState } from 'react';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/books');
        const data = await res.json();

        if (res.ok) {
          setBooks(data);
        } else {
          setError(data.message || 'Failed to fetch books');
        }
      } catch {
        setError('Server error. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading books...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Browse Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white shadow-md rounded p-4">
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
            <p className="text-sm text-gray-700 mb-2">by {book.author}</p>
            <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}