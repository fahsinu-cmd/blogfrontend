import { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", formData);

      login(res.data.token, res.data.user);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   const token = localStorage.getItem("token");
   if (token) {
     navigate("/" , {replace: true});
   }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-gray-100">
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/40"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          <p className="text-blue-600 font-semibold mb-3">Welcome Back</p>

          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Login to Bloger
          </h1>

          <p className="text-gray-500 mb-8">
            Continue reading, writing, and managing your blogs.
          </p>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-200 p-4 rounded-2xl mb-5 outline-none focus:ring-4 focus:ring-blue-100"
            required
          />

          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 p-4 rounded-2xl mb-6 outline-none focus:ring-4 focus:ring-blue-100"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-6 text-gray-500">
            No account?
            <Link to="/register" className="text-blue-600 font-semibold ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}