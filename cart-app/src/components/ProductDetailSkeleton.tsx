export const ProductDetailSkeleton = () => (
  <div className="py-8 bg-white rounded-lg border border-gray-200">
    <div className="max-w-screen-xl px-4 mx-auto">
      <div className="animate-pulse">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <div className="w-full h-96 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
            <div className="h-20 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
