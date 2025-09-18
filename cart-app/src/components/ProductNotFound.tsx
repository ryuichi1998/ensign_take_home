import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export const ProductNotFound = () => (
  <div className="py-8 bg-white rounded-lg border border-gray-200">
    <div className="max-w-screen-xl px-4 mx-auto text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Product Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The product you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>
    </div>
  </div>
);
