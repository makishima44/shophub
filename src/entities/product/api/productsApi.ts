import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductDetails, ProductsResponse } from "../model/types";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),

  endpoints: (builder) => ({
    getProducts: builder.query<{ products: Product[]; total: number }, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,

      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        total: response.total,
      }),
    }),

    getProductById: builder.query<ProductDetails, string>({
      query: (id) => `products/${id}`,
    }),

    getProductsBySearch: builder.query<{ products: Product[]; total: number }, { search: string; limit: number; skip: number }>({
      query: ({ search, limit, skip }) => `products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`,

      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        total: response.total,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsBySearchQuery } = productsApi;
