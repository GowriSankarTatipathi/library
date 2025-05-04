// File: src/Pages/Addbooks/AddBooks.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Science',
  'Fiction',
  'Non-Fiction',
  'Fantasy',
  'Crime'
];

export default function AddBooks() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    coverUrl: '',
    category: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    if (!localStorage.getItem('token') || !isAdmin) {
      navigate('/auth/login');
    }
  }, [isAdmin, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Log payload to verify
    console.log("Form payload:", form);

    try {
      const res = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Book added successfully!');
        setForm({ title: '', author: '', description: '', coverUrl: '', category: '' });
      } else {
        setError(data.message || 'Failed to add book');
      }
    } catch (err) {
      console.error("Add book error:", err);
      setError('Server error. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        {success && <p className="text-green-600 mb-2 text-sm">{success}</p>}

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded"
          rows={3}
        />
        <input
          name="coverUrl"
          value={form.coverUrl}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full p-2 mb-4 border rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded bg-white"
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Book
        </button>
      </form>
    </div>
  );
}
