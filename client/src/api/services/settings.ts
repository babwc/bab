import { Settings } from "../../ts/types";
import { api } from "./api";

interface SettingResponse {
  id: string;
  setting: Settings;
  mode: number;
}

export const settingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsAll: builder.query<SettingResponse[], void>({
      query: () => {
        return {
          url: "settings/all",
        };
      },
      providesTags: ["Settings"],
    }),
    getSettingData: builder.query<SettingResponse, Settings>({
      query: (setting) => {
        return {
          url: "settings/one",
          params: { setting },
        };
      },
      providesTags: ["Settings"],
    }),
    modifySetting: builder.mutation<SettingResponse, { setting: Settings }>({
      query: ({ setting }) => {
        return {
          url: "settings/modify",
          method: "PATCH",
          body: { setting },
        };
      },
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetSettingsAllQuery,
  useGetSettingDataQuery,
  useModifySettingMutation,
} = settingsApi;
