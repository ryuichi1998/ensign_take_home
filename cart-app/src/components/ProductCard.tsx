import { Link } from "react-router";
import type { Product } from "../types";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-56 w-full">
          <img
            className="mx-auto h-full w-full object-contain p-4"
            src={product.image}
            alt={product.title}
          />
        </div>
      </Link>

      <div className="pt-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold leading-tight text-gray-900 hover:underline mb-2 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2 mb-3">
          <StarRating rating={product.rating.rate} />
          <p className="text-sm font-medium text-gray-900">
            {product.rating.rate}
          </p>
          <p className="text-sm font-medium text-gray-500">
            ({product.rating.count})
          </p>
        </div>

        <div className="mb-4">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {product.category}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
