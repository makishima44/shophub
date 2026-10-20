export { ProductCard } from "./ui/ProductCard/ProductCard";
export type { Product } from "./model/types";

export {
  productsApi,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsBySearchQuery,
  useGetProductCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "./api/productsApi";
