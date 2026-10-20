export {
  addItem,
  cartReducer,
  clearCart,
  decrementItem,
  hydrateCart,
  incrementItem,
  removeItem,
  selectCartItemCount,
  selectCartHydrated,
  selectCartItems,
  selectCartTotal,
  type CartItem,
  type CartState,
} from "./model/cartSlice";
export { loadCartItems, saveCartItems } from "./model/cartStorage";
