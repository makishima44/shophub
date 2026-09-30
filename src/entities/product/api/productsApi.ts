import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductDetails, ProductsResponse } from "../model/types";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",

      transformResponse: (response: ProductsResponse) => {
        return response.products;
      },
    }),

    getProductById: builder.query<ProductDetails, string>({
      query: (id) => `products/${id}`,
    }),

    getProductsBySearch: builder.query<Product[], string>({
      query: (search) => `/products/search?q=${search}`,

      transformResponse: (response: ProductsResponse) => {
        return response.products;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsBySearchQuery } = productsApi;
