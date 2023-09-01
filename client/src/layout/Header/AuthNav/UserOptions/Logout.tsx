import { useAppDispatch } from "../../../../api/store";

import { useLogoutMutation } from "../../../../api/services/auth";

import { logOut } from "../../../../features/auth/authSlice";

const Logout = () => {
  const [logout] = useLogoutMutation();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
  };
  return (
    <div className="user-options__option" onClick={handleLogout}>
      Log out
    </div>
  );
};

export default Logout;
