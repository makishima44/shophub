export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type ProductsResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductDetails = Product & {
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  brand: string;
  sku: string;
  weight: number;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  images: string[];
  tags: string[];

  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;

  reviews: ProductReview[];
};
