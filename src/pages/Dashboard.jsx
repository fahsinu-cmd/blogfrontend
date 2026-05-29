  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import API from "../api/axios";
  import Loading from "../component/Loading";

  export default function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyBlogs = async () => {
      try {
        const res = await API.get("/api/blogs/my-blogs");
        setBlogs(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const deleteBlog = async (id) => {
      const confirmDelete = confirm("Delete this blog?");
      if (!confirmDelete) return;

      try {
        await API.delete(`/api/blogs/${id}`);
        setBlogs(blogs.filter((blog) => blog._id !== id));
        alert("Blog deleted");
      } catch (error) {
        alert(error.response?.data?.message || "Delete failed");
      }
    };

    useEffect(() => {
      fetchMyBlogs();
    }, []);

    if (loading) return <Loading />;

    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
    const totalLikes = blogs.reduce(
      (sum, blog) => sum + (blog.likes?.length || 0),
      0
    );

    return (
      <div className="min-h-screen bg-slate-50 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-5 mb-10">
            <div>
              <p className="text-blue-600 font-semibold">Creator Panel</p>
              <h1 className="text-5xl font-black text-gray-900 mt-2">
                Dashboard
              </h1>
            </div>

            <Link to="/create-blog">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition">
                + Create Blog
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl shadow border border-gray-100">
              <h2 className="text-gray-500 font-medium">Total Blogs</h2>
              <p className="text-5xl font-black mt-3">{blogs.length}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow border border-gray-100">
              <h2 className="text-gray-500 font-medium">Total Views</h2>
              <p className="text-5xl font-black mt-3">{totalViews}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow border border-gray-100">
              <h2 className="text-gray-500 font-medium">Total Likes</h2>
              <p className="text-5xl font-black mt-3">{totalLikes}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black">My Blogs</h2>
                <p className="text-gray-500 mt-1">
                  Manage your published articles
                </p>
              </div>
            </div>

            {blogs.length === 0 ? (
              <div className="p-12 text-center">
                <h3 className="text-2xl font-bold">No blogs yet</h3>
                <p className="text-gray-500 mt-2">
                  Create your first blog from the button above.
                </p>
              </div>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-6 border-b last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-5">
                    <img
                     src={
  blog.image ||
  "https://sewbemidji.com/wp-content/uploads/2024/04/no-image-image.png"
}
                      alt={blog.title}
                      className="w-20 h-20 object-cover rounded-2xl"
                    />

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {blog.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {blog.category} • 👁 {blog.views || 0} • ❤️{" "}
                        {blog.likes?.length || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link to={`/blogs/${blog._id}`}>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800">
                        View
                      </button>
                    </Link>

                    <Link to={`/edit-blog/${blog._id}`}>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }