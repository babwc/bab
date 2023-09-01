import { ReactNode } from "react";

import Head from "../../components/Head";

import "./style.scss";

export const PageLayout = ({
  title,
  description,
  narrow = false,
  noPadding = false,
  fixedHeight,
  style,
  children,
}: {
  title?: string;
  description?: string;
  narrow?: boolean;
  noPadding?: boolean;
  fixedHeight?: boolean;
  style?: { [key: string]: string };
  children: ReactNode;
}) => {
  return (
    <div
      className={`page 
      ${narrow ? "narrow" : ""} 
      ${fixedHeight ? "fixed-height" : ""} 
      ${noPadding ? "no-padding" : ""}`}
      style={style || {}}
    >
      <Head title={title || ""} description={description || ""} />
      {children}
    </div>
  );
};

export default PageLayout;
