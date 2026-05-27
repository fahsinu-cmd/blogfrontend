import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-950 to-blue-950 rounded-3xl p-10 text-white shadow-2xl">
          <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl font-black mb-6">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h1 className="text-4xl font-black">{user?.name}</h1>
          <p className="text-gray-300 mt-2">{user?.email}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-8 rounded-3xl shadow border border-gray-100">
            <h2 className="text-2xl font-black mb-3">Account Info</h2>
            <p className="text-gray-600">
              Your Bloger account is active. You can create, edit, and manage
              your own blog posts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow border border-gray-100">
            <h2 className="text-2xl font-black mb-3">Quick Actions</h2>

            <div className="flex gap-3 mt-5">
              <Link to="/create-blog">
                <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold">
                  Create Blog
                </button>
              </Link>

              <Link to="/dashboard">
                <button className="bg-gray-900 text-white px-5 py-3 rounded-2xl font-bold">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}