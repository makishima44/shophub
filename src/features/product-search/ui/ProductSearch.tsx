import styles from "./ProductSearch.module.css";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ProductSearch = ({ value, onChange }: ProductSearchProps) => {
  return (
    <div className={styles.searchWrapper}>
      <span className={styles.icon}>⌕</span>
      <input className={styles.input} type='text' value={value} onChange={(e) => onChange(e.target.value)} placeholder='Search products...' />
    </div>
  );
};
