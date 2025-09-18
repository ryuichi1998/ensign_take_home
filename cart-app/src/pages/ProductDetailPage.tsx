import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useGetProductByIdQuery } from "../features/product/productApi";
import ProductDetail from "../components/ProductDetail";
import { ProductDetailSkeleton } from "../components/ProductDetailSkeleton";
import { ProductNotFound } from "../components/ProductNotFound";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(Number(id));

  if (!id || isNaN(Number(id))) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return <ProductNotFound />;
  }

  return (
    <>
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
      <section className="py-8 bg-white rounded-lg border border-gray-200">
        <div className="max-w-screen-xl px-4 mx-auto">
          <ProductDetail product={product} />
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
