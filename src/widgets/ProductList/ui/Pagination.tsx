import styles from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, isLoading = false, onPageChange }: PaginationProps) => {
  return (
    <nav className={styles.pagination} aria-label='Product pagination'>
      <button className={styles.button} disabled={isLoading || page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>

      <span className={styles.pageInfo}>
        {page} / {totalPages}
      </span>

      <button className={styles.button} disabled={isLoading || page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </nav>
  );
};
