import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SortParams } from "@/entities/product/model/types";
import { parseSortParams } from "@/features/product-sort";
import { ProductCatalog } from "@/widgets/ProductCatalog";
import { ProductToolbar } from "@/widgets/ProductToolbar";
import styles from "./page.module.css";

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") ?? "";
  const sortByParam = searchParams.get("sortBy");
  const orderParam = searchParams.get("order");
  const sort = parseSortParams(sortByParam, orderParam);
  const hasInvalidSort = (sortByParam !== null || orderParam !== null) && sort.sortBy === undefined;

  const [searchDraft, setSearchDraft] = useState(query);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchSession = useRef(false);

  const cancelPendingSearch = useCallback(() => {
    if (searchTimer.current !== null) {
      clearTimeout(searchTimer.current);
      searchTimer.current = null;
    }
  }, []);

  const updateUrl = useCallback((changes: Record<string, string | null>, historyMode: "push" | "replace" = "push") => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    const queryString = params.toString();
    const nextUrl = window.location.pathname + (queryString ? `?${queryString}` : "") + window.location.hash;
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;

    if (nextUrl === currentUrl) return false;

    if (historyMode === "push") window.history.pushState(null, "", nextUrl);
    else window.history.replaceState(null, "", nextUrl);

    return true;
  }, []);

  useEffect(() => {
    const restoreSearchFromUrl = () => {
      cancelPendingSearch();
      searchSession.current = false;
      setSearchDraft(new URLSearchParams(window.location.search).get("q") ?? "");
    };

    window.addEventListener("popstate", restoreSearchFromUrl);

    return () => {
      window.removeEventListener("popstate", restoreSearchFromUrl);
      cancelPendingSearch();
    };
  }, [cancelPendingSearch]);

  const handleSearchChange = (value: string) => {
    setSearchDraft(value);
    cancelPendingSearch();

    searchTimer.current = setTimeout(() => {
      searchTimer.current = null;
      const nextQuery = value.trim();
      const currentQuery = new URLSearchParams(window.location.search).get("q") ?? "";

      if (currentQuery !== query) return;

      const historyMode = searchSession.current ? "replace" : "push";
      const didUpdateUrl = updateUrl(nextQuery ? { q: nextQuery, category: null } : { q: null }, historyMode);

      if (didUpdateUrl) searchSession.current = true;
    }, 400);
  };

  const handleSearchBlur = () => {
    searchSession.current = false;
  };

  const handleCategoryChange = (category: string) => {
    cancelPendingSearch();
    searchSession.current = false;
    setSearchDraft("");
    updateUrl({ category: category || null, q: null });
  };

  const handleSortChange = (newSort: SortParams) => {
    updateUrl({ sortBy: newSort.sortBy ?? null, order: newSort.order ?? null });
  };

  const handleResetFilters = () => {
    cancelPendingSearch();
    searchSession.current = false;
    setSearchDraft("");
    updateUrl({ q: null, category: null, sortBy: null, order: null });
  };

  return (
    <main className={styles.page}>
      <ProductToolbar
        search={searchDraft}
        onSearchChange={handleSearchChange}
        onSearchBlur={handleSearchBlur}
        sortBy={sort.sortBy}
        order={sort.order}
        hasInvalidSort={hasInvalidSort}
        onSortChange={handleSortChange}
        onReset={handleResetFilters}
      />
      <ProductCatalog search={query} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} sortBy={sort.sortBy} order={sort.order} />
    </main>
  );
}
