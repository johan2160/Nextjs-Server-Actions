export default function Loading() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      {/* Title */}
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>

      {/* Create Genre Form */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <div className="h-4 bg-gray-200 rounded w-1/6 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/5"></div>
      </div>

      {/* List of Genres */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between p-4 bg-gray-100 rounded"
          >
            <div className="h-6 bg-gray-200 rounded w-1/5"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-8"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
