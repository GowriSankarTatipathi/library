import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Your account has been created! Redirecting to login...');
        setTimeout(() => navigate('/auth/login'), 2000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-amber-100 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-amber-700" />
          </div>
          <h2 className="text-3xl font-serif font-medium text-amber-800">Join Our Library</h2>
          <p className="text-gray-600 mt-2 text-center">Create an account to get started</p>
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded mb-6">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-md transition duration-200 shadow-md"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-8 pt-6 text-center border-t border-gray-200">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-amber-600 hover:text-amber-800 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}