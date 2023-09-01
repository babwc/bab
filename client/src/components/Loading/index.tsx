import ReactDOM from "react-dom";
import SvgLoading from "../../assets/icons/loading.svg";

import "./style.scss";

const Loading = ({ pageLoading = false }: { pageLoading?: boolean }) => {
  const rootElement = document.querySelector("#loading");

  return rootElement
    ? ReactDOM.createPortal(
        <div className={`loading ${pageLoading ? "full" : ""}`}>
          <img src={SvgLoading} alt="Loading, please wait" />
        </div>,
        rootElement
      )
    : null;
};

export default Loading;
