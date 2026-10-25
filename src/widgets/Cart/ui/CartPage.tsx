"use client";

import Image from "next/image";
import Link from "next/link";
import { clearCart, decrementItem, incrementItem, removeItem, selectCartHydrated, selectCartItems, selectCartTotal } from "@/entities/cart";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux/hooks";
import styles from "./CartPage.module.css";

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const hydrated = useAppSelector(selectCartHydrated);

  if (!hydrated) {
    return <main className={styles.container}><p className={styles.empty}>Loading cart...</p></main>;
  }

  if (items.length === 0) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Your cart</h1>
        <p className={styles.empty}>Your cart is empty.</p>
        <Link href="/products" className={styles.continueLink}>Browse products</Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Your cart</h1>
        <button className={styles.clearButton} onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>

      <div className={styles.layout}>
        <ul className={styles.items}>
          {items.map(({ product, quantity }) => (
            <li key={product.id} className={styles.item}>
              <Image className={styles.image} src={product.thumbnail} alt={product.title} width={112} height={112} unoptimized />
              <div className={styles.itemInfo}>
                <Link href={`/products/${product.id}`} className={styles.productTitle}>{product.title}</Link>
                <span className={styles.price}>{formatPrice(product.price)} each</span>
                <div className={styles.controls}>
                  <div className={styles.quantity} aria-label={`Quantity: ${quantity}`}>
                    <button aria-label={`Decrease ${product.title} quantity`} onClick={() => dispatch(decrementItem(product.id))}>−</button>
                    <span>{quantity}</span>
                    <button aria-label={`Increase ${product.title} quantity`} onClick={() => dispatch(incrementItem(product.id))}>+</button>
                  </div>
                  <button className={styles.textButton} onClick={() => dispatch(removeItem(product.id))}>Remove</button>
                </div>
              </div>
              <strong className={styles.lineTotal}>{formatPrice(product.price * quantity)}</strong>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <h2>Order summary</h2>
          <div className={styles.totalRow}><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <p className={styles.note}>Shipping and taxes are not included in this learning demo.</p>
          <Link href="/products" className={styles.continueLink}>Continue shopping</Link>
        </aside>
      </div>
    </main>
  );
};
