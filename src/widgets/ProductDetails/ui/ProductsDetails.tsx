"use client";

import { useGetProductByIdQuery } from "@/entities/product/api/productsApi";
import styles from "./ProductsDetails.module.css";

type Props = {
  id: string;
};

export const ProductDetails = ({ id }: Props) => {
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div className={styles.state}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.state}>Failed to load product</div>;
  }

  if (!product) {
    return <div className={styles.state}>Product not found</div>;
  }

  return (
    <main className={styles.container}>
      <section className={styles.product}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={product.images[0] || product.thumbnail} alt={product.title} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.meta}>
            <span className={styles.category}>{product.category}</span>
            <span className={styles.rating}>★ {product.rating}</span>
          </div>

          <h1 className={styles.title}>{product.title}</h1>

          <p className={styles.brand}>
            Brand: <strong>{product.brand}</strong>
          </p>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceBlock}>
            <span className={styles.price}>${product.price}</span>

            {product.discountPercentage > 0 && <span className={styles.discount}>-{product.discountPercentage.toFixed(0)}%</span>}
          </div>

          <div className={styles.availability}>
            <span className={styles.status}>{product.availabilityStatus}</span>

            <span className={styles.stock}>{product.stock} items available</span>
          </div>

          <button className={styles.addButton}>Add to cart</button>

          <div className={styles.delivery}>
            <div>
              <span className={styles.deliveryLabel}>Shipping</span>
              <span>{product.shippingInformation}</span>
            </div>

            <div>
              <span className={styles.deliveryLabel}>Returns</span>
              <span>{product.returnPolicy}</span>
            </div>

            <div>
              <span className={styles.deliveryLabel}>Warranty</span>
              <span>{product.warrantyInformation}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.additional}>
        <div className={styles.additionalHeader}>
          <h2>Product information</h2>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detail}>
            <span>SKU</span>
            <strong>{product.sku}</strong>
          </div>

          <div className={styles.detail}>
            <span>Weight</span>
            <strong>{product.weight} kg</strong>
          </div>

          <div className={styles.detail}>
            <span>Width</span>
            <strong>{product.dimensions.width} cm</strong>
          </div>

          <div className={styles.detail}>
            <span>Height</span>
            <strong>{product.dimensions.height} cm</strong>
          </div>

          <div className={styles.detail}>
            <span>Depth</span>
            <strong>{product.dimensions.depth} cm</strong>
          </div>
        </div>

        <div className={styles.tags}>
          {product.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.reviews}>
        <h2>Reviews</h2>

        <div className={styles.reviewsList}>
          {product.reviews.map((review, index) => (
            <article key={`${review.reviewerName}-${index}`} className={styles.review}>
              <div className={styles.reviewHeader}>
                <strong>{review.reviewerName}</strong>
                <span>★ {review.rating}</span>
              </div>

              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
