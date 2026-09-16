
import { Product } from "../../model/types";
import styles from "./ProductCard.module.css";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={product.thumbnail} alt={product.title} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>

          <button className={styles.button}>View</button>
        </div>
      </div>
    </article>
  );
};
