import { CSSProperties } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { AxiosError } from "axios";

const ErrorMessage = ({
  error,
}: {
  error: FetchBaseQueryError | AxiosError | string;
}) => {
  return (
    <div style={style}>
      <span style={{ color: "#ff0000" }}>{error as string}</span>
    </div>
  );
};

export default ErrorMessage;

const style: CSSProperties = {
  width: "100%",
  textAlign: "center",
};
