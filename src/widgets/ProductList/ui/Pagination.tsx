import styles from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <nav className={styles.pagination} aria-label='Product pagination'>
      <button className={styles.button} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>

      <span className={styles.pageInfo}>
        {page} / {totalPages}
      </span>

      <button className={styles.button} disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </nav>
  );
};
