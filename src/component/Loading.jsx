export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

      <p className="text-gray-600 font-medium">Loading content...</p>
    </div>
  );
}