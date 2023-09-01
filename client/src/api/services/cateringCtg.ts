import { api } from "./api";

import { ICateringCtg, ResponseMessage } from "../../ts/interfaces";

export const cateringCtgApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICateringCtg[], void>({
      query: () => ({ url: "catering-category/all" }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ _id: id }: ICateringCtg) => ({
                type: "CateringCategory" as const,
                id,
              })),
              "CateringCategory",
            ]
          : ["CateringCategory"];
      },
    }),
    addCategory: builder.mutation<ResponseMessage, { name: string }>({
      query: (body) => {
        return {
          url: "catering-category/new",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["CateringCategory"],
    }),
    deleteCategory: builder.mutation<ResponseMessage, { id: string }>({
      query: (body) => {
        return {
          url: "catering-category/delete",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["CateringCategory"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = cateringCtgApi;
