import { useState, useMemo, Dispatch, FormEvent, ChangeEvent } from "react";
import { useTypedSelector } from "../../../api/store";

import { AnimatePresence } from "framer-motion";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";

import { selectCurrentId } from "../../../features/auth/authSlice";

import { useChangePasswordMutation } from "../../../api/services/user";
import { IChangePass } from "../../../ts/interfaces";

const initialValue = { password: "", newPassword: "" };
const ChangePassword = ({
  changePassOpen,
  setChangePassOpen,
}: {
  changePassOpen: boolean;
  setChangePassOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState<IChangePass>(initialValue);

  const [changePass] = useChangePasswordMutation();

  const userId = useTypedSelector(selectCurrentId);

  const handleModal = () => setChangePassOpen(!changePassOpen);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const match = useMemo(() => {
    const { password, newPassword } = value;
    return password === newPassword;
  }, [value]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await changePass({ id: userId, ...value });

    handleModal();
    setValue({ ...value, ...initialValue });
  };

  return (
    <>
      {changePassOpen && (
        <AnimatePresence>
          <Modal
            header={"Password update"}
            confirmBtnTitle="Update"
            disabled={match}
            handleSubmit={handleSubmit}
          >
            <Input
              label="Password"
              name="password"
              type="password"
              value={value.password}
              handleChange={handleChange}
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={value.newPassword}
              handleChange={handleChange}
            />
          </Modal>
        </AnimatePresence>
      )}
    </>
  );
};

export default ChangePassword;
