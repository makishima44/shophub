import Link from "next/link";
import { CartLink } from "./CartLink";
import styles from "./Header.module.css";

export const Header = () => (
  <header className={styles.header}>
    <Link href="/" className={styles.logo}>
      ShopHub
    </Link>
    <nav className={styles.navigation} aria-label="Main navigation">
      <Link href="/products" className={styles.navigationLink}>
        Products
      </Link>
      <CartLink />
    </nav>
  </header>
);
