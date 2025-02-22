export default function Loading() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      {/* Title */}
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 dark:bg-gray-700"></div>

      {/* Form Skeleton */}
      <div className="bg-gray-100 p-4 rounded w-1/2 mb-6 dark:bg-gray-800">
        <div className="h-4 bg-gray-200 rounded w-1/6 mb-4 dark:bg-gray-700"></div>
        <div className="h-10 bg-gray-200 rounded mb-4 dark:bg-gray-700"></div>
        <div className="h-20 bg-gray-200 rounded mb-4 dark:bg-gray-700"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}