import { Link } from 'react-router-dom';
import Categories from "../../Components/Categories";
import Booksdata from "../../Components/Booksdata";
import hero_image from '../../assets/hero_image.jpg';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div>
      {/* 🌄 Hero Section */}
      <section
        id="hero_Section"
        className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hero_image})`,
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-lg text-white text-center max-w-2xl">
          <h2 className="md:text-5xl text-3xl font-bold font-Poppins mb-4">
            Organize. Discover. Read. The Smarter Way to Manage Your Library.
          </h2>

          {!isLoggedIn && (
            <div className="mt-6 flex justify-center gap-4">
              <Link to="/auth/login">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
              <Link to="/auth/signup">
                <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 📚 Categories and Books */}
      <Categories />
      <Booksdata />
    </div>
  );
};

export default Home;
