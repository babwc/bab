import { useEffect, useMemo, useState } from "react";

import { useTypedSelector } from "../../../../api/store";

import { selectCurrentId } from "../../../../features/auth/authSlice";

import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";

import {
  useUserInfoQuery,
  useEditProfileMutation,
} from "../../../../api/services/user";

import { IUserInfo } from "../../../../ts/interfaces";

const ProfileModal = ({ handleModal }: { handleModal: () => void }) => {
  const userId = useTypedSelector(selectCurrentId);

  const { data, isSuccess } = useUserInfoQuery(userId);
  const [edit] = useEditProfileMutation();

  const [value, setValue] = useState<IUserInfo>({ name: "", email: "" });

  const isDataNew = useMemo(() => {
    if (isSuccess) {
      return Object.keys(value).some((key: string) => {
        return value[key as keyof IUserInfo] !== data[key as keyof IUserInfo];
      });
    }
  }, [value]);

  useEffect(() => {
    if (isSuccess) {
      const { name, email } = data;

      setValue({ ...value, name, email });
    }
  }, [isSuccess]);

  const handleChange = (e: any) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = await edit({ id: userId, ...value });
  };

  return (
    <Modal
      header="Profile data"
      confirmBtnTitle="Update"
      closeModal={handleModal}
      disabled={isDataNew ? false : true}
      handleSubmit={handleSubmit}
    >
      <Input
        label="Name"
        value={value.name}
        name="name"
        handleChange={handleChange}
      />
      <Input
        label="Phone"
        value={value.email}
        name="phone"
        handleChange={handleChange}
      />
    </Modal>
  );
};

export default ProfileModal;
