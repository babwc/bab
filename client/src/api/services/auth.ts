import { Role } from "../../ts/types";
import { api } from "./api";

import { LogInInputs } from "../../features/auth/components/LogIn";
import { RegisterInputs } from "../../features/auth/components/Register";
import { ResponseMessage } from "../../ts/interfaces";

interface UserData {
  id: string;
  userData: { name: string; role: Role };
  token: string;
}

interface LogInData extends LogInInputs {
  recapToken: string;
}

interface RegisterData extends RegisterInputs {
  recapToken: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation<ResponseMessage, RegisterData>({
        query: (credentials) => {
          return {
            url: "auth/register",
            method: "POST",
            body: credentials,
          };
        },
      }),
      login: builder.mutation<UserData, LogInData>({
        query: (credentials) => {
          return {
            url: "auth/login",
            method: "POST",
            body: credentials,
          };
        },
      }),
      logout: builder.mutation<ResponseMessage, void>({
        query: () => {
          return {
            url: "auth/logout",
            method: "POST",
          };
        },
      }),
      emailConfirm: builder.mutation<
        { confirmed: boolean },
        { confirmCode: string }
      >({
        query: (body) => {
          return {
            url: "auth/confirm",
            method: "POST",
            body,
          };
        },
      }),
      refreshToken: builder.query<UserData, void>({
        query: () => {
          return {
            url: "auth/refreshToken",
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
  useLazyRefreshTokenQuery,
  useEmailConfirmMutation,
} = authApi;
