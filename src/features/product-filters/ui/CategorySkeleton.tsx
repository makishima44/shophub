import styles from "./CategorySkeleton.module.css";

export const CategorySkeleton = () => (
  <>
    <div className={`${styles.skeleton} ${styles.title}`} aria-hidden='true' />
    <ul className={styles.list} aria-hidden='true'>
      {Array.from({ length: 10 }, (_, index) => (
        <li key={index}>
          <div className={`${styles.skeleton} ${styles.category}`} />
        </li>
      ))}
    </ul>
  </>
);
