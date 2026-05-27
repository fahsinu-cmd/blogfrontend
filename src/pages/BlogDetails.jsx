import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import Loading from "../component/Loading";
import { useAuth } from "../context/AuthContext";

export default function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const likeBlog = async () => {
    try {
      const res = await API.put(`/blogs/${id}/like`);
      setBlog(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Login required to like");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <Loading />;

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          <h1 className="text-3xl font-bold">Blog not found</h1>
          <Link to="/blogs" className="text-blue-600 mt-4 inline-block">
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = blog.image
    ? `http://localhost:5000/${blog.image}`
    : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop";

  const isOwner =
    user?._id === blog.author?._id ||
    user?._id === blog.author ||
    user?._id === blog.user?._id ||
    user?._id === blog.user;

  const isLiked = blog.likes?.some((id) => id === user?._id);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative h-[420px]">
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
          <div className="max-w-5xl mx-auto text-white">
            <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              {blog.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-black mt-6 leading-tight">
              {blog.title}
            </h1>

            <p className="text-gray-200 mt-4">
              By {blog.author?.name || "Admin"} • {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-4 mb-8 border-b pb-6">
            <div className="bg-gray-100 px-5 py-3 rounded-2xl font-semibold text-gray-700">
              👁 {blog.views || 0} Views
            </div>

            <button
              onClick={likeBlog}
              className={`px-5 py-3 rounded-2xl font-semibold transition ${
                isLiked
                  ? "bg-pink-600 text-white"
                  : "bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white"
              }`}
            >
              ❤️ {blog.likes?.length || 0} Likes
            </button>

            {isOwner && (
              <Link to={`/edit-blog/${blog._id}`}>
                <button className="bg-yellow-500 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-yellow-600 transition">
                  Edit Blog
                </button>
              </Link>
            )}
          </div>

          <article className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-9 whitespace-pre-line">
              {blog.content}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}