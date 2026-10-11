import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductCategory, ProductDetails, ProductsResponse, SortParams } from "../model/types";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),

  endpoints: (builder) => ({
    getProducts: builder.query<{ products: Product[]; total: number }, { limit: number; skip: number } & SortParams>({
      query: ({ limit, skip, sortBy, order }) => {
        const params = new URLSearchParams({
          limit: String(limit),
          skip: String(skip),
        });

        if (sortBy && order) {
          params.set("sortBy", sortBy);
          params.set("order", order);
        }

        return `products?${params.toString()}`;
      },

      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        total: response.total,
      }),
    }),

    getProductById: builder.query<ProductDetails, string>({
      query: (id) => `products/${id}`,
    }),

    getProductsBySearch: builder.query<{ products: Product[]; total: number }, { search: string; limit: number; skip: number } & SortParams>({
      query: ({ search, limit, skip, sortBy, order }) => {
        const params = new URLSearchParams({
          q: search,
          limit: String(limit),
          skip: String(skip),
        });

        if (sortBy && order) {
          params.set("sortBy", sortBy);
          params.set("order", order);
        }

        return `products/search?${params.toString()}`;
      },

      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        total: response.total,
      }),
    }),

    getProductCategories: builder.query<ProductCategory[], void>({
      query: () => "products/categories",
    }),

    getProductsByCategory: builder.query<{ products: Product[]; total: number }, { category: string; limit: number; skip: number } & SortParams>({
      query: ({ category, limit, skip, sortBy, order }) => {
        const params = new URLSearchParams({
          limit: String(limit),
          skip: String(skip),
        });

        if (sortBy && order) {
          params.set("sortBy", sortBy);
          params.set("order", order);
        }

        return `products/category/${encodeURIComponent(category)}?${params.toString()}`;
      },

      transformResponse: (response: ProductsResponse) => ({
        products: response.products,
        total: response.total,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsBySearchQuery, useGetProductCategoriesQuery, useGetProductsByCategoryQuery } =
  productsApi;
