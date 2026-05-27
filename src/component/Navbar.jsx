import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
            B
          </div>

          <span className="text-2xl font-black text-gray-900">
            Bloger
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/blogs" className={linkClass}>
            Blogs
          </NavLink>

          {user && (
            <>
              <NavLink to="/create-blog" className={linkClass}>
                Create
              </NavLink>

              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-gray-600 hover:text-blue-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-semibold hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-500">Welcome</p>
                <p className="font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2.5 rounded-2xl font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}