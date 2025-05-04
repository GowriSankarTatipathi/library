// File: src/Pages/Bookdetail/BookDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/books/${id}`);
        if (!res.ok) throw new Error('Book not found');
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBook();
  }, [id]);

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!book) {
    return <div className="text-center py-10">Loading book details...</div>;
  }

  return (
    <section className="p-5">
      <Link to="/">
        <button className="px-3 py-1 text-blue-600 underline">&larr; Back to Home</button>
      </Link>
      <div className="flex md:flex-row flex-col justify-center gap-10 p-5 mt-5">
        {book.coverUrl && (
          <img src={book.coverUrl} alt="book_img" className="h-80 w-96 object-cover rounded" />
        )}
        <div>
          <h2 className="font-semibold text-4xl mb-2">{book.title}</h2>
          <p className="text-xl mb-2">{book.description}</p>
          <h4 className="text-lg font-semibold mb-2">{book.author}</h4>
          <p className="text-sm font-medium text-gray-500">{book.category}</p>
        </div>
      </div>
    </section>
  );
}
