import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";
import { incrementQuantity, decrementQuantity } from "../utils";
import type { Product } from "../types";
import type { AppDispatch } from "../store";

interface UseAddToCartOptions {
  initialQuantity?: number;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export const useAddToCart = (
  product: Product,
  options: UseAddToCartOptions = {}
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialQuantity = 1, onAddToCart } = options;
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    setQuantity((prev) => incrementQuantity(prev));
  };

  const decrement = () => {
    setQuantity((prev) => decrementQuantity(prev));
  };

  const reset = () => {
    setQuantity(initialQuantity);
  };

  const setValue = (value: number) => {
    setQuantity(value > 0 ? value : 1);
  };

  const handleAddToCart = (customQuantity?: number) => {
    const finalQuantity = customQuantity || quantity;

    if (onAddToCart) {
      onAddToCart(product, finalQuantity);
    } else {
      if (finalQuantity === 1) {
        dispatch(addToCart(product));
      } else {
        dispatch(addToCart(product));
        dispatch(updateQuantity({ id: product.id, quantity: finalQuantity }));
      }
    }
    reset();
  };

  return {
    quantity,
    increment,
    decrement,
    reset,
    setValue,
    addToCart: handleAddToCart,
    canDecrement: quantity > 1,
    canIncrement: true,
  };
};
