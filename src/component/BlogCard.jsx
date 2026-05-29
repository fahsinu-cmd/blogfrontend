import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
//   const fallbackImage =
//     "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop";

  const imageUrl = blog.image
    ? `${import.meta.env.VITE_API_URL}${blog.image.startsWith("/") ? "" : "/"}${blog.image}`
    : fallbackImage;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={blog.title}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
        />

        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold text-blue-600">
          {blog.category}
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-gray-600 mt-3 line-clamp-3 leading-relaxed">
          {blog.content?.slice(0, 120)}...
        </p>

        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <span>👁 {blog.views || 0} views</span>
          <span>❤️ {blog.likes?.length || 0}</span>
        </div>

        <Link to={`/blogs/${blog._id}`}>
          <button className="mt-6 w-full bg-gray-900 text-white py-3 rounded-2xl font-semibold hover:bg-blue-600 transition">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}