import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  removeFromCart,
  updateQuantity,
  toggleItemSelection,
} from "../features/cart/cartSlice";
import { formatPrice, incrementQuantity, decrementQuantity } from "../utils";
import type { Product } from "../types";
import type { AppDispatch, RootState } from "../store";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedItems } = useSelector((state: RootState) => state.cart);
  const isSelected = selectedItems.includes(product.id);

  const handleIncrement = () => {
    const newQuantity = incrementQuantity(quantity);
    dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
  };

  const handleDecrement = () => {
    const newQuantity = decrementQuantity(quantity);
    if (newQuantity < 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleSelectionChange = () => {
    dispatch(toggleItemSelection(product.id));
  };

  return (
    <div
      className={`rounded-lg border bg-white p-4 shadow-sm md:p-6 transition-colors ${
        isSelected ? "border-blue-300 bg-blue-50/30" : "border-gray-200"
      }`}
      data-testid={`cart-item-${product.id}`}
    >
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="flex items-center md:order-0">
          <input
            type="checkbox"
            id={`select-${product.id}`}
            checked={isSelected}
            onChange={handleSelectionChange}
            data-testid={`select-checkbox-${product.id}`}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>

        <Link to={`/product/${product.id}`} className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 object-contain rounded-lg bg-white p-2"
            src={product.image}
            alt={product.title}
          />
        </Link>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-medium text-gray-900 hover:underline line-clamp-2">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-4">
            <p
              className="text-sm text-gray-600"
              data-testid={`product-price-${product.id}`}
            >
              ${formatPrice(product.price)}
            </p>
            <span className="text-sm text-gray-500 capitalize">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRemove}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
              data-testid={`remove-${product.id}`}
            >
              <Trash2 className="me-1.5 h-4 w-4" />
              Remove
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={handleDecrement}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-l-lg border-r border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-colors"
                data-testid={`decrement-${product.id}`}
              >
                <Minus className="h-3 w-3 text-gray-900" />
              </button>
              <span className="w-12 shrink-0 text-center text-sm font-medium text-gray-900">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-r-lg border-l border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-colors"
                data-testid={`increment-${product.id}`}
              >
                <Plus className="h-3 w-3 text-gray-900" />
              </button>
            </div>
          </div>

          <div className="text-end md:w-32">
            <p className="text-base font-bold text-gray-900">
              ${formatPrice(product.price * quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
