// !!! not implemented yet !!!

import { api } from "./api";

import {
  IAuthSlice,
  ICart,
  IProduct,
  ResponseMessage,
} from "../../ts/interfaces";

interface CartInstantModif {
  customerId: string;
  storedUserId: string;
  products: [{ data: string; quantity: number }];
  updatedAt: string;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCart: builder.query<ICart, string>({
        query: (id) => {
          return {
            url: "cart/one",
            params: { id },
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.products.map(({ data }: { data: IProduct }) => ({
                  type: "Cart" as const,
                  id: data._id,
                })),
                "Cart",
              ]
            : ["Cart"];
        },
      }),
      addToCart: builder.mutation<
        ResponseMessage,
        { customerId: string; productId: string; quantity: number }
      >({
        query: (body) => {
          return {
            url: "cart/add",
            method: "POST",
            body,
          };
        },
        invalidatesTags: () => ["Cart"],
      }),
      addToCartOne: builder.mutation<
        ResponseMessage,
        {
          customerId: string;
          productId: string;
        }
      >({
        query: (body) => {
          return {
            url: "cart/add-one",
            method: "POST",
            body,
          };
        },
        invalidatesTags: () => ["Cart", { type: "Cart", id: "LIST" }],
      }),
      addToCartMultiple: builder.mutation<
        ResponseMessage,
        {
          customerId: string;
          storedUserId: string;
          products: [{ data: string; quantity: number }];
          updatedAt: string;
        }
      >({
        query: (body) => {
          return {
            url: "cart/add-multiple",
            method: "POST",
            body,
          };
        },
        invalidatesTags: () => ["Cart", { type: "Cart", id: "LIST" }],
      }),
      subtractFromCartOne: builder.mutation<
        ResponseMessage,
        { customerId: string; productId: string }
      >({
        query: (body) => {
          return {
            url: "cart/subtract",
            method: "POST",
            body,
          };
        },
        invalidatesTags: () => ["Cart", { type: "Cart", id: "LIST" }],
      }),
      deleteProductFromCart: builder.mutation<
        ResponseMessage,
        { cartId: string; productId: string }
      >({
        query: (body) => {
          return {
            url: "cart/delete",
            method: "DELETE",
            body,
          };
        },
        invalidatesTags: () => ["Cart", { type: "Cart", id: "LIST" }],
      }),
    };
  },
});

// export const {
//   useGetCartQuery,
//   useLazyGetCartQuery,
//   useAddToCartMutation,
//   useAddToCartOneMutation,
//   useAddToCartMultipleMutation,
//   useSubtractFromCartOneMutation,
//   useDeleteProductFromCartMutation,
// } = cartApi;
