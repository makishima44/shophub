"use client";

import { ProductSearch } from "@/features/product-search";
import { ProductList } from "@/widgets/ProductList";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks";
import styles from "./page.module.css";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  return (
    <main className={styles.page}>
      <ProductSearch value={search} onChange={setSearch} />
      <ProductList search={debouncedSearch} />
    </main>
  );
}
