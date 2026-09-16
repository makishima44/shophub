import { Product } from "@/entities/products/model/types";
import { ProductCard } from "@/entities/products/ui/ProductCard/ProductCard";
import styles from "./ProductList.module.css";

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
