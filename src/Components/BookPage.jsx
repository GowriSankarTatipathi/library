import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookPage() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();

        const filtered = data.filter((book) =>
          book.category?.toLowerCase() === category?.toLowerCase()
        );

        setBooks(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "...";

  if (loading) return <p className="text-center py-10">Loading category books...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Books in "{formattedCategory}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <Link to={`/book/${book._id}`} key={book._id}>
              <div className="bg-white shadow rounded p-4 hover:shadow-lg transition cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-sm mt-2">{book.description}</p>
                {book.coverUrl && (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="mt-2 w-full h-52 object-cover rounded"
                  />
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No books found in this category.</p>
        )}
      </div>
    </div>
  );
}
