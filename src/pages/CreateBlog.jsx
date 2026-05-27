import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(file ? URL.createObjectURL(file) : "");
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("content", formData.content);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      setSubmitting(true);

      await API.post("/api/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog created");
      navigate("/blogs");
    } catch (error) {
      alert(error.response?.data?.message || "Create failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-blue-600 font-semibold mb-3">Create New Post</p>

          <h1 className="text-5xl font-black text-gray-900 leading-tight">
            Share your story with the world
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Add a title, category, thumbnail, and blog content to publish your
            article.
          </p>

          <div className="mt-8 bg-white rounded-3xl shadow border border-gray-100 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-80 object-cover"
              />
            ) : (
              <div className="h-80 flex items-center justify-center bg-gray-100 text-gray-500">
                Image preview will appear here
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
        >
          <label className="font-semibold text-gray-700">Blog Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter blog title"
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            required
          />

          <label className="font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            required
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
          </select>

          <label className="font-semibold text-gray-700">Thumbnail Image</label>
          <input
            name="image"
            onChange={handleChange}
            type="file"
            accept="image/*"
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-5"
            required
          />

          <label className="font-semibold text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="9"
            placeholder="Write blog content..."
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-6 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none"
            required
          />

          <button
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {submitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}