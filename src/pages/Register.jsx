import { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await API.post("/api/auth/register", formData);

      alert("Register success");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
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
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            alt="Register"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/40"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          <p className="text-blue-600 font-semibold mb-3">Create Account</p>

          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Join Bloger
          </h1>

          <p className="text-gray-500 mb-8">
            Start publishing your thoughts and stories today.
          </p>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Full name"
            className="w-full border border-gray-200 p-4 rounded-2xl mb-5 outline-none focus:ring-4 focus:ring-blue-100"
            required
          />

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
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center mt-6 text-gray-500">
            Already have account?
            <Link to="/login" className="text-blue-600 font-semibold ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}