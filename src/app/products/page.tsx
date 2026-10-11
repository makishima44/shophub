"use client";

import { Suspense } from "react";
import { ProductsPageContent } from "./ProductPageContent";
import styles from "./page.module.css";

export default function ProductsPage() {
  return (
    <Suspense fallback={<main className={styles.page} />}>
      <ProductsPageContent />
    </Suspense>
  );
}
