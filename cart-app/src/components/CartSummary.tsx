import { Link } from "react-router";
import { useSelector } from "react-redux";
import { formatPrice, truncateText } from "../utils";
import type { RootState } from "../store";

export const CartSummary = () => {
  const { items, selectedItems } = useSelector(
    (state: RootState) => state.cart
  );

  const selectedCartItems = items.filter((item) =>
    selectedItems.includes(item.product.id)
  );

  const selectedTotalItems = selectedCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subTotal = selectedCartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const tax = subTotal * 0.09;
  const shippingFee = subTotal < 50 ? 1.99 : 0;
  const finalTotal = subTotal + tax + shippingFee;

  const hasSelectedItems = selectedItems.length > 0;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-gray-900">Order Summary</p>

      {hasSelectedItems ? (
        <>
          <div className="space-y-3 border-b border-gray-200 pb-4">
            <h4 className="text-sm font-medium text-gray-700">Items:</h4>
            {selectedCartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex-1">
                  <p
                    className="text-gray-900"
                    data-testid={`summary-product-title-${product.id}`}
                  >
                    {truncateText(product.title, 30)}
                  </p>
                  <p
                    className="text-gray-500"
                    data-testid={`summary-product-price-${product.id}`}
                  >
                    ${formatPrice(product.price)} × {quantity}
                  </p>
                </div>
                <p
                  className="font-medium text-gray-900 ml-2"
                  data-testid={`summary-product-subtotal-${product.id}`}
                >
                  ${formatPrice(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                Subtotal ({selectedTotalItems} items)
              </dt>
              <dd className="text-base font-medium text-gray-900">
                ${formatPrice(subTotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm font-normal text-gray-500">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">
                {subTotal < 50 ? `$${formatPrice(1.99)}` : "Free"}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm font-normal text-gray-500">Tax</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${formatPrice(tax)}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-3">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd
                className="text-base font-bold text-gray-900"
                data-testid={`summary-final-total`}
              >
                ${formatPrice(finalTotal)}
              </dd>
            </div>
          </div>

          <button className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors">
            Checkout ({selectedItems.length})
          </button>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No items selected</p>
          <p className="text-sm text-gray-400">
            Select items to proceed with checkout
          </p>
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-500">or</span>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 underline hover:no-underline"
        >
          Continue Shopping
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
