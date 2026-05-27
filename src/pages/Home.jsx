import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import BlogCard from "../component/BlogCard";
import Loading from "../component/Loading";

export default function Home() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");

      setLatestBlogs(res.data.slice(0, 6));
      setTrendingBlogs(
        [...res.data].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-300 font-semibold mb-4">
              Modern Blogging Platform
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Write, Read & Share Powerful Stories
            </h1>

            <p className="text-gray-300 mt-6 text-lg max-w-xl">
              Discover trending articles, publish your ideas, and build your own
              creator profile with Bloger.
            </p>

            <div className="flex gap-4 mt-8">
              <Link to="/blogs">
                <button className="bg-blue-600 px-7 py-4 rounded-2xl font-bold hover:bg-blue-700 transition">
                  Explore Blogs
                </button>
              </Link>

              <Link to="/create-blog">
                <button className="bg-white text-gray-900 px-7 py-4 rounded-2xl font-bold hover:bg-gray-100 transition">
                  Start Writing
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-3xl p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
              alt="Blog"
              className="rounded-2xl h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-blue-600 font-semibold">Fresh Posts</p>
            <h2 className="text-4xl font-black text-gray-900 mt-2">
              Latest Blogs
            </h2>
          </div>

          <Link to="/blogs" className="text-blue-600 font-semibold">
            View all
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <p className="text-blue-600 font-semibold">Most Viewed</p>
          <h2 className="text-4xl font-black text-gray-900 mt-2">
            Trending Blogs
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}