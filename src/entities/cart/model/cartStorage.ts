import type { Product } from "@/entities/product";
import type { CartItem } from "./cartSlice";

const STORAGE_KEY = "shophub-cart";

const isProduct = (value: unknown): value is Product => {
  if (!value || typeof value !== "object") return false;

  const product = value as Partial<Product>;
  return (
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.description === "string" &&
    typeof product.price === "number" &&
    typeof product.thumbnail === "string"
  );
};

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<CartItem>;
  return isProduct(item.product) && Number.isInteger(item.quantity) && (item.quantity ?? 0) > 0;
};

export const loadCartItems = (): CartItem[] => {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return [];

    const parsedValue: unknown = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(isCartItem) : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items: CartItem[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};
