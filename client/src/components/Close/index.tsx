import { RxCross2 } from "react-icons/rx";

import "./style.scss";

const Close = ({
  color = "#333",
  background = false,
}: {
  color?: string;
  background?: boolean;
}) => {
  return (
    <div className={`close ${background ? "background" : ""}`}>
      <RxCross2 color={color} size={30} />
    </div>
  );
};

export default Close;
