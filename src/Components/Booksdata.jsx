import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Booksdata = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {books.map((book) => (
        <Link to={`/book/${book._id}`} key={book._id}>
          <div className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-700">{book.author}</p>
            <p className="text-sm mt-2">{book.description}</p>
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="mt-2 w-full h-60 object-cover"
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Booksdata;
