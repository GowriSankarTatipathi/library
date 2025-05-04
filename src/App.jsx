// File: App.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

export default function App() {
  const { pathname } = useLocation();
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}