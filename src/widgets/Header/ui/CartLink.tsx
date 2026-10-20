"use client";

import Link from "next/link";
import { selectCartItemCount } from "@/entities/cart";
import { useAppSelector } from "@/shared/lib/redux/hooks";
import styles from "./Header.module.css";

export const CartLink = () => {
  const itemCount = useAppSelector(selectCartItemCount);

  return (
    <Link href="/cart" className={styles.cartLink} aria-label={`Cart, ${itemCount} items`}>
      Cart <span className={styles.badge}>{itemCount}</span>
    </Link>
  );
};
