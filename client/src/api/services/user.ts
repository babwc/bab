import { api } from "./api";

import {
  IUserInfo,
  IOrder,
  ResponseMessage,
  IChangePass,
} from "../../ts/interfaces";
import { Order_Status } from "../../ts/types";

interface ChangePass extends IChangePass {
  id: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      userInfo: builder.query<IUserInfo, string>({
        query: (id) => {
          return {
            url: "user/info",
            method: "GET",
            params: { id },
          };
        },
        providesTags: ["User"],
      }),
      myOrders: builder.query<
        { orders: IOrder[]; total: number },
        {
          name?: string;
          status: Order_Status;
          searchValue?: string;
          currentPage: number;
          limit: number;
        }
      >({
        query: ({ name, status, searchValue, limit, currentPage }) => {
          return {
            url: "user/order",
            method: "GET",
            params: { name, status, searchValue, limit, currentPage },
          };
        },
        providesTags: ["User", "Order"],
      }),
      editProfile: builder.mutation<
        ResponseMessage,
        { id: string; name: string; email: string }
      >({
        query: (data) => {
          return {
            url: "user/edit",
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["User"],
      }),
      changePassword: builder.mutation<ResponseMessage, ChangePass>({
        query: (data) => {
          return {
            url: "user/changepass",
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["User"],
      }),
    };
  },
});

export const {
  useUserInfoQuery,
  useMyOrdersQuery,
  useEditProfileMutation,
  useChangePasswordMutation,
} = userApi;
