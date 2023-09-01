import { api } from "./api";

import {
  ICheckoutItems,
  IConfirmOrder,
  IOrder,
  ResponseMessage,
} from "../../ts/interfaces";
import { Order_Status } from "../../ts/types";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getOrders: builder.query<
        { orders: IOrder[]; total: number },
        {
          status: Order_Status;
          searchValue?: string;
          currentPage?: number;
          limit?: number;
        }
      >({
        query: ({ status, searchValue, limit, currentPage }) => {
          return {
            url: "order/all",
            method: "GET",
            params: { status, searchValue, limit, currentPage },
          };
        },
        providesTags: ["Order"],
      }),
      acceptOrder: builder.mutation<ResponseMessage, { _id: string }>({
        query: (body) => {
          return {
            url: "order/accept",
            method: "PATCH",
            body,
          };
        },
        invalidatesTags: ["Order"],
      }),
      cancelOrder: builder.mutation<ResponseMessage, { _id: string }>({
        query: (body) => {
          return {
            url: "order/cancel",
            method: "PATCH",
            body,
          };
        },
        invalidatesTags: ["Order"],
      }),
      createPaymentIntent: builder.mutation<
        { paymentId: string; clientSecret: string },
        { items: ICheckoutItems[] }
      >({
        query: (body) => {
          return {
            url: "order/create-payment-intent",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Order"],
      }),
      confirmPayment: builder.mutation<{ orderNumber: number }, IConfirmOrder>({
        query: (body) => {
          return {
            url: "order/confirm",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Order"],
      }),
    };
  },
});

export const {
  useGetOrdersQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
} = orderApi;
