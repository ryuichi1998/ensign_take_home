interface ProductGridSkeletonProps {
  title?: string;
  count?: number;
}

export const ProductGridSkeleton = ({
  title = "Our Products",
  count = 8,
}: ProductGridSkeletonProps) => (
  <>
    <h1 className="text-3xl font-bold mb-8">{title}</h1>
    <div className="products-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="skeleton-card">
            <div className="h-56 w-full bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
);
