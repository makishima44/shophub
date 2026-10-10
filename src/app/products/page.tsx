"use client";

import { ProductSearch } from "@/features/product-search";
import { ProductList } from "@/widgets/ProductList";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { ProductCatalog } from "@/widgets/ProductCatalog";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query ?? "");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";

    if (currentQuery === debouncedSearch) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    console.log(params);

    if (debouncedSearch) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    router.replace(queryString ? `/products?${queryString}` : "/products");
  }, [debouncedSearch, searchParams, router]);

  return (
    <main className={styles.page}>
      <ProductSearch value={search} onChange={setSearch} />
      <ProductCatalog search={debouncedSearch} />
    </main>
  );
}
