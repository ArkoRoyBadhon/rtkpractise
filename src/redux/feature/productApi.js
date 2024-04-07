import { api } from "../api/apiSlice";

const ProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (allParam) => {
        return {
          url: `/products`,
          params: {
            limit: allParam?.limitVal || 10,
          },
        };
      },
      providesTags: ["product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["product"],
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: `/products/categories`,
      }),
      providesTags: ["product"],
    }),
    getProductByCategory: builder.query({
      query: () => ({
        url: `/products/categories/jewelery`,
      }),
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, payload }) => {
        console.log("inside", id);
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductCategoriesQuery,
  useGetProductByCategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi;
