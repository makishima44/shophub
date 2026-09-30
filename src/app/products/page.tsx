"use client";

import { ProductSearch } from "@/features/product-search";
import { ProductList } from "@/widgets/ProductList";
import { useState } from "react";
import styles from "./page.module.css";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  return (
    <main className={styles.page}>
      <ProductSearch value={search} onChange={setSearch} />
      <ProductList search={search} />
    </main>
  );
}
