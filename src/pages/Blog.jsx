import { useEffect, useState } from "react";
import API from "../api/axios";
import BlogCard from "../component/BlogCard";
import SearchBar from "../component/SearchBar";
import Loading from "../component/Loading";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
     const res = await API.get(`/api/blogs?search=${search}&category=${category}`);
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchBlogs, 400);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-300 font-semibold mb-3">Explore Stories</p>

          <h1 className="text-5xl md:text-6xl font-black mb-5">
            Discover Latest Blogs
          </h1>

          <p className="text-gray-300 max-w-2xl text-lg">
            Browse articles, tutorials, ideas, and trending posts from creators.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-5 flex flex-col md:flex-row justify-between gap-4">
          <SearchBar search={search} setSearch={setSearch} />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white border border-gray-200 px-4 py-3.5 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Blog Collection
            </h2>
            <p className="text-gray-500 mt-1">
              {blogs.length} blogs available
            </p>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              No blogs found
            </h2>
            <p className="text-gray-500 mt-2">
              Try another search keyword or category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}