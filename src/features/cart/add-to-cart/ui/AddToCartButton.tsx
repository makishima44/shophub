"use client";

import { addItem } from "@/entities/cart";
import type { Product } from "@/entities/product";
import { useAppDispatch } from "@/shared/lib/redux/hooks";
import styles from "./AddToCartButton.module.css";

type Props = {
  product: Product;
};

export const AddToCartButton = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <button className={styles.button} onClick={() => dispatch(addItem(product))}>
      Add to cart
    </button>
  );
};
