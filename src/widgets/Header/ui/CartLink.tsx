"use client";

import Link from "next/link";
import { selectCartHydrated, selectCartItemCount } from "@/entities/cart";
import { useAppSelector } from "@/shared/lib/redux/hooks";
import styles from "./Header.module.css";

export const CartLink = () => {
  const itemCount = useAppSelector(selectCartItemCount);
  const hydrated = useAppSelector(selectCartHydrated);

  return (
    <Link href="/cart" className={styles.cartLink} aria-label={`Cart, ${itemCount} items`}>
      Cart {hydrated && <span className={styles.badge}>{itemCount}</span>}
    </Link>
  );
};
