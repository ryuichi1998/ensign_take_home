import { Minus, Plus } from "lucide-react";
import { useAddToCart } from "../hooks/useAddToCart";
import { AddToCartButton } from "./AddToCartButton";
import StarRating from "./StarRating";
import type { Product } from "../types";

interface ProductDetailProps {
  product: Product;
  showQuantitySelector?: boolean;
  showAddToCart?: boolean;
  onAddToCart?: (product: Product, quantity: number) => void;
}

const ProductDetail = ({
  product,
  showQuantitySelector = true,
  showAddToCart = true,
  onAddToCart,
}: ProductDetailProps) => {
  const { quantity, increment, decrement, addToCart, canDecrement } =
    useAddToCart(product, { onAddToCart });

  return (
    <div className="p-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <div className="rounded-lg overflow-hidden p-4">
            <img
              className="w-full h-96 object-contain"
              src={product.image}
              alt={product.title}
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl leading-tight">
            {product.title}
          </h1>

          <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              ${product.price}
            </p>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <StarRating rating={product.rating.rate} />
              <p className="text-sm font-medium leading-none text-gray-500">
                ({product.rating.rate})
              </p>
              <span className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline cursor-pointer">
                {product.rating.count} Reviews
              </span>
            </div>
          </div>

          <div className="mt-4">
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 capitalize">
              {product.category}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {(showQuantitySelector || showAddToCart) && (
            <div className="mt-8 sm:gap-4 sm:items-center sm:flex border-t border-gray-200 pt-6">
              {showQuantitySelector && (
                <div className="flex items-center">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-900 mr-3"
                  >
                    Qty:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrement}
                      disabled={!canDecrement}
                      aria-label="Decrease quantity"
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-2 text-center min-w-[3rem] font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={increment}
                      aria-label="Increase quantity"
                      className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {showAddToCart && (
                <AddToCartButton
                  onAddToCart={() => addToCart()}
                  className="text-white mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 focus:outline-none flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
