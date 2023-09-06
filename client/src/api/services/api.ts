import { RootState } from "../store";

import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5552`,
  // baseUrl: "",
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "auth/refreshToken",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.userData;

      api.dispatch(
        setCredentials({ ...refreshResult.data, user, isAuth: true })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Product",
    "Settings",
    "Catering",
    "CateringCategory",
    "Auth",
    "User",
    "Cart",
    "Order",
    "Reservation",
  ],
  endpoints: () => ({}),
});
