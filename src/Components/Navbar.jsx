import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    setIsAdmin(role === 'admin');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/login');
    window.location.reload(); // force refresh to update UI
  };

  return (
    <nav className="w-full">
      <div className="bg-white bg-opacity-65 font-Poppins flex justify-between items-center p-5 sticky top-0">
        <h2 className="font-Oswald font-base text-2xl text-black">Smart Library</h2>
        <ul className="hidden md:flex items-center gap-5 text-medium font-base cursor-pointer">
          <Link to='/'><li>Home</li></Link>
          <Link to='/browsebook'><li>Browse Book</li></Link>
          {isAdmin && <Link to="/addbooks"><li>Add books</li></Link>}
          {isLoggedIn && (
            <li onClick={handleLogout} className="cursor-pointer text-red-500 hover:underline">Logout</li>
          )}
        </ul>
        <div className="md:hidden">
          <HiOutlineMenu className="w-8 h-8" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {isOpen && (
        <div className="p-2">
          <ul className="md:hidden flex flex-col justify-start gap-5 bg-black rounded-sm text-white w-full text-medium font-base cursor-pointer p-3">
            <Link to='/'><li>Home</li></Link>
            <Link to='/browsebook'><li>Browse Book</li></Link>
            {isAdmin && <Link to="/addbooks"><li>Add books</li></Link>}
            {isLoggedIn && (
              <li onClick={handleLogout} className="text-red-500 hover:underline">Logout</li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
