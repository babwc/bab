import { useState } from "react";

import axios, { AxiosError } from "axios";

import { ReqMethod } from "../ts/types";

const useRequest = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const sendRequest = async ({
    url,
    method,
    body,
  }: {
    url: string;
    method: ReqMethod;
    body: any;
  }) => {
    try {
      const response = await axios({
        method,
        url: `/${url}`,
        data: body,
      });

      setData(response);
    } catch (err) {
      setError((err as AxiosError).response?.data);
    }
  };

  return { data, error, sendRequest };
};

export default useRequest;
