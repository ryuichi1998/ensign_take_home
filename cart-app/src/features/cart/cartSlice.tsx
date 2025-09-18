import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, CartState } from "../../types";

const initialState: CartState = {
  items: [],
  selectedItems: [],
  totalItems: 0,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }

      state.totalItems = state.items.length;

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );

      state.selectedItems = state.selectedItems.filter(
        (id) => id !== action.payload
      );

      state.totalItems = state.items.length;

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== id);

          state.selectedItems = state.selectedItems.filter(
            (selectedId) => selectedId !== id
          );
        } else {
          item.quantity = quantity;
        }
      }

      state.totalItems = state.items.length;

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.selectedItems = [];
      state.totalItems = 0;
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    selectItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (!state.selectedItems.includes(id)) {
        state.selectedItems.push(id);
      }
    },

    deselectItem: (state, action: PayloadAction<number>) => {
      state.selectedItems = state.selectedItems.filter(
        (id) => id !== action.payload
      );
    },

    selectAllItems: (state) => {
      state.selectedItems = state.items.map((item) => item.product.id);
    },

    clearSelection: (state) => {
      state.selectedItems = [];
    },

    toggleItemSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.selectedItems.includes(id)) {
        state.selectedItems = state.selectedItems.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        state.selectedItems.push(id);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectItem,
  deselectItem,
  selectAllItems,
  clearSelection,
  toggleItemSelection,
} = cartSlice.actions;

export default cartSlice.reducer;
