export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full md:w-[420px]">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search blogs, topics, authors..."
        className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3.5 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
      />
    </div>
  );
}