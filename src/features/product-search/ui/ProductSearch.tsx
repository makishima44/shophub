import styles from "./ProductSearch.module.css";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export const ProductSearch = ({ value, onChange, onBlur }: ProductSearchProps) => {
  return (
    <div className={styles.searchWrapper}>
      <span className={styles.icon}>⌕</span>
      <input
        className={styles.input}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder='Search products...'
      />
    </div>
  );
};
