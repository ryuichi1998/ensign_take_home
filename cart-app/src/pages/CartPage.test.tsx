import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, type EnhancedStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router";
import CartPage from "../pages/CartPage";
import cartReducer, { addToCart } from "../features/cart/cartSlice";
import type { Product, CartState } from "../types";
import "@testing-library/jest-dom/vitest";

// Mock the useFlyingCart hook
vi.mock("../hooks/useFlyingCart", () => ({
  useFlyingCart: () => ({
    flyToCart: vi.fn(),
  }),
}));

// Sample test products
const mockProduct1: Product = {
  id: 1,
  title: "Test Product 1",
  price: 29.99,
  image: "https://example.com/image1.jpg",
  category: "electronics",
  description: "Test description 1",
  rating: { rate: 4.5, count: 100 },
};

const mockProduct2: Product = {
  id: 2,
  title: "Test Product 2 with a very long title that should be truncated",
  price: 49.99,
  image: "https://example.com/image2.jpg",
  category: "clothing",
  description: "Test description 2",
  rating: { rate: 4.0, count: 50 },
};

type TestStore = EnhancedStore<{ cart: CartState }>;

const createTestStore = (initialState?: Partial<CartState>): TestStore => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [],
        selectedItems: [],
        totalItems: 0,
        totalQuantity: 0,
        totalPrice: 0,
        ...initialState,
      },
    },
  });
};

const TestWrapper = ({
  children,
  store,
}: {
  children: React.ReactNode;
  store: TestStore;
}) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe("Empty Cart", () => {
    it("should display empty cart message when no items", () => {
      const store = createTestStore();
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      expect(screen.getByText("Shopping Cart (0)")).toBeInTheDocument();
      expect(screen.getByText("No items selected")).toBeInTheDocument();
      expect(
        screen.getByText("Select items to proceed with checkout")
      ).toBeInTheDocument();
    });
  });

  describe("Cart with Items", () => {
    let store: TestStore;

    beforeEach(() => {
      store = createTestStore();
      store.dispatch(addToCart(mockProduct1));
      store.dispatch(addToCart(mockProduct1));
      store.dispatch(addToCart(mockProduct2));
    });

    it("should display cart items with correct information", () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      expect(screen.getByText("Shopping Cart (2)")).toBeInTheDocument();
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(
        screen.getByText(/Test Product 2 with a very long title/)
      ).toBeInTheDocument();
      expect(screen.getByTestId("product-price-1")).toHaveTextContent("$29.99");
      expect(screen.getByTestId("product-price-2")).toHaveTextContent("$49.99");
      expect(screen.getByText("clothing")).toBeInTheDocument();
      expect(screen.getByText("electronics")).toBeInTheDocument();
    });

    it("should increment item quantity when plus button is clicked", async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const incrementButton = screen.getByTestId("increment-1");
      fireEvent.click(incrementButton);

      await waitFor(() => {
        const state = store.getState().cart;
        const product1Item = state.items.find((item) => item.product.id === 1);
        expect(product1Item?.quantity).toBe(3);
      });
    });

    it("should decrement item quantity when decrement button is clicked", async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const decrementButton = screen.getByTestId("decrement-1");
      fireEvent.click(decrementButton);

      await waitFor(() => {
        const state = store.getState().cart;
        const product1Item = state.items.find((item) => item.product.id === 1);
        expect(product1Item?.quantity).toBe(1);
      });
    });

    it("should remove item when remove button is clicked", async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const removeButton = screen.getByTestId("remove-1");
      fireEvent.click(removeButton);

      await waitFor(() => {
        const state = store.getState().cart;
        expect(state.items).toHaveLength(1);
        expect(
          state.items.find((item) => item.product.id === 1)
        ).toBeUndefined();
      });
    });

    it("should remove item when quantity is decremented to 0", async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const decrementButton = screen.getByTestId("decrement-2");
      fireEvent.click(decrementButton);

      await waitFor(() => {
        const state = store.getState().cart;
        expect(state.items).toHaveLength(1);
        expect(
          state.items.find((item) => item.product.id === 2)
        ).toBeUndefined();
      });
    });
  });

  describe("Item Selection", () => {
    let store: TestStore;

    beforeEach(() => {
      const initialState: Partial<CartState> = {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        selectedItems: [],
        totalItems: 2,
        totalQuantity: 3,
        totalPrice: 109.97,
      };
      store = createTestStore(initialState);
    });

    it("should select individual items when checkbox is clicked", async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const checkbox = screen.getByTestId("select-checkbox-1");
      fireEvent.click(checkbox);

      await waitFor(() => {
        const state = store.getState().cart;
        console.log(state.selectedItems);
        expect(state.selectedItems).toContain(1);
      });
    });

    it("should deselect item when clicking selected checkbox", async () => {
      const storeWithSelection = createTestStore({
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        selectedItems: [1],
        totalItems: 2,
        totalQuantity: 3,
        totalPrice: 109.97,
      });

      render(
        <TestWrapper store={storeWithSelection}>
          <CartPage />
        </TestWrapper>
      );

      const checkbox = screen.getByTestId("select-checkbox-1");
      fireEvent.click(checkbox);

      await waitFor(() => {
        const state = storeWithSelection.getState().cart;
        expect(state.selectedItems).not.toContain(1);
      });
    });

    it('should select all items when "Select All" is clicked', async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const selectAllCheckbox = screen.getByLabelText("Select All");
      fireEvent.click(selectAllCheckbox);

      await waitFor(() => {
        const state = store.getState().cart;
        expect(state.selectedItems).toEqual([1, 2]);
      });
    });

    it('should deselect all items when "Select All" is unchecked', async () => {
      const storeWithAllSelected = createTestStore({
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        selectedItems: [1, 2],
        totalItems: 2,
        totalQuantity: 3,
        totalPrice: 109.97,
      });

      render(
        <TestWrapper store={storeWithAllSelected}>
          <CartPage />
        </TestWrapper>
      );

      const selectAllCheckbox = screen.getByLabelText("Select All");
      fireEvent.click(selectAllCheckbox);

      await waitFor(() => {
        const state = storeWithAllSelected.getState().cart;
        expect(state.selectedItems).toEqual([]);
      });
    });

    it("should show selected items count", async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const selectAllCheckbox = screen.getByLabelText("Select All");
      fireEvent.click(selectAllCheckbox);
      expect(screen.getByText("2 selected")).toBeInTheDocument();
    });

    it('should check "Select All" when all items are manually selected', async () => {
      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const selectAllCheckbox = screen.getByLabelText(
        "Select All"
      ) as HTMLInputElement;
      const checkbox1 = screen.getByTestId("select-checkbox-1");
      const checkbox2 = screen.getByTestId("select-checkbox-2");

      expect(selectAllCheckbox.checked).toBe(false);

      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);

      await waitFor(() => {
        expect(selectAllCheckbox.checked).toBe(true);
      });
    });
  });

  describe("Clear Cart", () => {
    it("should clear all items when clear cart button is clicked", async () => {
      const store = createTestStore({
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        selectedItems: [1, 2],
        totalItems: 2,
        totalQuantity: 3,
        totalPrice: 109.97,
      });

      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const clearCartButton = screen.getByText("Clear Cart");
      fireEvent.click(clearCartButton);

      await waitFor(() => {
        const state = store.getState().cart;
        expect(state.items).toHaveLength(0);
        expect(state.selectedItems).toHaveLength(0);
        expect(state.totalItems).toBe(0);
        expect(state.totalQuantity).toBe(0);
        expect(state.totalPrice).toBe(0);
      });
    });

    it("should update visual styling when item selection changes", async () => {
      const store = createTestStore();
      store.dispatch(addToCart(mockProduct1));
      store.dispatch(addToCart(mockProduct2));

      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const cartItem1 = screen.getByTestId("cart-item-1");
      const cartItem2 = screen.getByTestId("cart-item-2");
      const checkbox1 = screen.getByTestId("select-checkbox-1");

      // Initially both should have default styling
      expect(cartItem1).toHaveClass("border-gray-200");
      expect(cartItem2).toHaveClass("border-gray-200");

      // Select first item
      fireEvent.click(checkbox1);

      await waitFor(() => {
        // First item should now have selection styling
        expect(cartItem1).toHaveClass("border-blue-300");
        expect(cartItem1).toHaveClass("bg-blue-50/30");

        // Second item should still have default styling
        expect(cartItem2).toHaveClass("border-gray-200");
      });
    });
  });

  describe("Order Summary", () => {
    it("should display correct order summary for selected items", () => {
      const store = createTestStore({
        items: [
          { product: mockProduct1, quantity: 2 }, // $29.99 × 2 = $59.98
          { product: mockProduct2, quantity: 1 }, // $49.99 × 1 = $49.99
        ],
        selectedItems: [1], // Only first product selected
        totalItems: 2,
        totalQuantity: 3,
        totalPrice: 109.97,
      });

      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      // Should show only selected item in summary
      expect(screen.getByText("Order Summary")).toBeInTheDocument();
      expect(screen.getByText("Items:")).toBeInTheDocument();
      expect(screen.getByTestId("summary-product-title-1")).toHaveTextContent(
        "Test Product 1"
      );

      // Subtotal should be $59.98 for selected items only
      expect(screen.getByText("Subtotal (2 items)")).toBeInTheDocument();
      expect(
        screen.getByTestId("summary-product-subtotal-1")
      ).toHaveTextContent("$59.98");

      expect(screen.getByText("$5.40")).toBeInTheDocument();
      expect(screen.getByText("Free")).toBeInTheDocument();
      // Final total should be $65.38
      expect(screen.getByTestId("summary-final-total")).toHaveTextContent(
        "$65.38"
      );
    });

    it("should show shipping fee for orders under $50", () => {
      // Create a cart with total under $50
      const lowValueProduct: Product = {
        ...mockProduct1,
        price: 25.0,
      };

      const store = createTestStore({
        items: [{ product: lowValueProduct, quantity: 1 }],
        selectedItems: [1],
        totalItems: 1,
        totalQuantity: 1,
        totalPrice: 25.0,
      });

      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      expect(screen.getByText("$1.99")).toBeInTheDocument();

      expect(screen.getByText("$29.24")).toBeInTheDocument();
    });

    it("should enable checkout button when items are selected", () => {
      const store = createTestStore({
        items: [{ product: mockProduct1, quantity: 1 }],
        selectedItems: [1],
        totalItems: 1,
        totalQuantity: 1,
        totalPrice: 29.99,
      });

      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const checkoutButton = screen.getByText("Checkout (1)");
      expect(checkoutButton).toBeInTheDocument();
      expect(checkoutButton).not.toBeDisabled();
    });

    it("should show continue shopping link", () => {
      const store = createTestStore();

      render(
        <TestWrapper store={store}>
          <CartPage />
        </TestWrapper>
      );

      const continueShoppingLink = screen.getByText("Continue Shopping");
      expect(continueShoppingLink).toBeInTheDocument();
      expect(continueShoppingLink.closest("a")).toHaveAttribute("href", "/");
    });
  });
});
