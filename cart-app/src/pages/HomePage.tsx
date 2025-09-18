import { useGetAllProductsQuery } from "../features/product/productApi";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/ProductGridSkeleton";
import type { Product } from "../types";

export default function HomePage() {
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Products
        </h1>
        <p className="text-gray-600">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600">
          Discover amazing products at great prices
        </p>
      </div>

      <div className="products-grid">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products && products.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">Showing {products.length} products</p>
        </div>
      )}
    </>
  );
}
