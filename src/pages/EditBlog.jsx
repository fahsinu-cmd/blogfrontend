import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import Loading from "../component/Loading";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);

        setFormData({
          title: res.data.title,
          category: res.data.category,
          content: res.data.content,
          image: null,
        });

        setPreview(
          res.data.image ? `http://localhost:5000/${res.data.image}` : ""
        );
      } catch (error) {
        alert("Blog fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(file ? URL.createObjectURL(file) : preview);
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

      await API.put(`/blogs/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog updated");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <p className="text-blue-600 font-semibold mb-3">Edit Post</p>

          <h1 className="text-5xl font-black text-gray-900">
            Update your blog content
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Modify title, category, content, or thumbnail image.
          </p>

          <div className="mt-8 bg-white rounded-3xl shadow border overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-80 object-cover"
              />
            ) : (
              <div className="h-80 flex items-center justify-center bg-gray-100 text-gray-500">
                No image preview
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
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-5 outline-none focus:ring-4 focus:ring-blue-100"
            type="text"
            required
          />

          <label className="font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-5 outline-none focus:ring-4 focus:ring-blue-100"
            required
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
          </select>

          <label className="font-semibold text-gray-700">Change Image</label>
          <input
            name="image"
            onChange={handleChange}
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-5"
            type="file"
            accept="image/*"
          />

          <label className="font-semibold text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-200 p-4 rounded-2xl mt-2 mb-6 outline-none focus:ring-4 focus:ring-blue-100 resize-none"
            rows="9"
            required
          />

          <button
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {submitting ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}