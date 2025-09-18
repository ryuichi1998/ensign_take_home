import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useAddToCart } from "./useAddToCart";
import cartReducer from "../features/cart/cartSlice";
import "@testing-library/jest-dom/vitest";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  image: "test.jpg",
  category: "test",
  description: "test",
  rating: { rate: 4.5, count: 100 },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={configureStore({ reducer: { cart: cartReducer } })}>
    {children}
  </Provider>
);

describe("useAddToCart", () => {
  test("should initial quantity selector to be 1", () => {
    const { result } = renderHook(() => useAddToCart(mockProduct), { wrapper });
    expect(result.current.quantity).toBe(1);
  });

  test("should increment quantity", () => {
    const { result } = renderHook(() => useAddToCart(mockProduct), { wrapper });
    act(() => result.current.increment());
    expect(result.current.quantity).toBe(2);
  });

  test("should decrement quantity", () => {
    const { result } = renderHook(() => useAddToCart(mockProduct), { wrapper });
    act(() => result.current.increment());
    expect(result.current.canDecrement).toBe(true);
    act(() => result.current.decrement());
    expect(result.current.quantity).toBe(1);
  });

  test("should not decrement when quantity is 1", () => {
    const { result } = renderHook(() => useAddToCart(mockProduct), { wrapper });
    expect(result.current.canDecrement).toBe(false);
  });

  test("should reset to quantity after adding to cart", () => {
    const { result } = renderHook(() => useAddToCart(mockProduct), { wrapper }); // Default initialQuantity = 1
    act(() => result.current.setValue(5));
    act(() => result.current.addToCart());
    expect(result.current.quantity).toBe(1);
  });

  test("should not decrement when quantity is 1", () => {
    const { result } = renderHook(() => useAddToCart(mockProduct), { wrapper });
    expect(result.current.canDecrement).toBe(false);
    act(() => result.current.increment());
    expect(result.current.canDecrement).toBe(true);
  });

  test("should canIncrement is always true", () => {
    const { result } = renderHook(() => useAddToCart(mockProduct), { wrapper });
    expect(result.current.canIncrement).toBe(true);
  });
});
