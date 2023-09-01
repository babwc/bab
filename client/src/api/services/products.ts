import { IProduct, IProductNew, ResponseMessage } from "../../ts/interfaces";
import { api } from "./api";

interface ProductAll {
  products: IProduct[];
  total: number;
}

interface ProductAllParams {
  searchValue: string;
  department: string;
  limit: number;
  currentPage: number;
}

interface ProductMany {
  user: string;
  updatedAt: string;
  products: {
    data: {
      _id: string;
      image: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductAll, ProductAllParams>({
      query: ({
        searchValue,
        department,
        limit,
        currentPage,
      }: ProductAllParams) => {
        return {
          url: "product/all",
          params: { searchValue, department, limit, currentPage },
        };
      },
      providesTags: (data) => {
        const { products } = data || {};

        return products
          ? [
              ...products.map(({ _id: id }: IProduct) => ({
                type: "Product" as const,
                id,
              })),
              "Product",
            ]
          : ["Product"];
      },
    }),
    getOne: builder.query<IProduct, string>({
      query: (uid) => {
        return {
          url: "product/one",
          params: { uid },
        };
      },
      providesTags: ["Product"],
    }),
    getMany: builder.query<ProductMany[], { ids: string[] }>({
      query: (body) => {
        return {
          url: "product/many",
          method: "POST",
          body,
        };
      },
      providesTags: ["Product"],
    }),
    getSearchedProducts: builder.query<
      IProduct[],
      {
        name: string;
        exclude?: any;
        department?: string;
        container?: boolean;
      }
    >({
      query: (body) => {
        return {
          url: "product/search",
          method: "POST",
          body,
        };
      },
      providesTags: ["Product"],
    }),
    getSomeProducts: builder.query<IProduct[], string>({
      query: (_id) => {
        return {
          url: "product/some",
          method: "POST",
          body: { _id },
        };
      },
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<ResponseMessage, IProductNew>({
      query: (body) => {
        return {
          url: "product/new",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<ResponseMessage, IProductNew>({
      query: (body) => {
        return {
          url: "product/edit",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateInStock: builder.mutation<
      ResponseMessage,
      { id: string | undefined; inStock: boolean }
    >({
      query: (body) => {
        return {
          url: "product/update-instock",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<ResponseMessage, { uid: string }>({
      query: (body) => {
        return {
          url: "product/delete",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteImage: builder.mutation<ResponseMessage, string>({
      query: (id) => {
        return {
          url: "product/delete-img",
          method: "POST",
          params: { id },
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSomeProductsQuery,
  useGetManyQuery,
  useGetSearchedProductsQuery,
  useGetOneQuery,
  useDeleteImageMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateInStockMutation,
  useDeleteProductMutation,
} = productsApi;
