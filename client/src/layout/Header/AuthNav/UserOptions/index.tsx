import { useNavigate } from "react-router-dom";

import Logout from "./Logout";

import "./style.scss";

const UserOptions = ({
  handleToggle,
  handlePassModal: _handlePassModal,
}: {
  handleToggle: () => void;
  handlePassModal: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="user-options__select" onClick={handleToggle}>
      <div
        className="user-options__option"
        onClick={() => navigate("/myorders")}
      >
        My Orders
      </div>
      {/* <div className="user-options__option" onClick={handlePassModal}>
        Change Password
      </div> */}
      <Logout />
    </div>
  );
};

export default UserOptions;
