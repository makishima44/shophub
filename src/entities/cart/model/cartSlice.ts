import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/entities/product";
import type { RootState } from "@/app/store/store";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

const initialState: CartState = { items: [], hydrated: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({ product: action.payload, quantity: 1 });
    },

    incrementItem(state, action: PayloadAction<number>) {
      const item = state.items.find(({ product }) => product.id === action.payload);
      if (item) item.quantity += 1;
    },

    decrementItem(state, action: PayloadAction<number>) {
      const item = state.items.find(({ product }) => product.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(({ product }) => product.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },

    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      if (state.hydrated) return;

      const mergedItems = new Map(action.payload.map((item) => [item.product.id, item]));

      for (const item of state.items) {
        const savedItem = mergedItems.get(item.product.id);
        if (savedItem) savedItem.quantity += item.quantity;
        else mergedItems.set(item.product.id, item);
      }

      state.items = [...mergedItems.values()];
      state.hydrated = true;
    },
  },
});

export const { addItem, clearCart, decrementItem, hydrateCart, incrementItem, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemCount = (state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: RootState) => state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
export const selectCartHydrated = (state: RootState) => state.cart.hydrated;
