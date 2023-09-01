import { FormEvent, useEffect } from "react";

import Modal from "./Modal";

interface Props {
  header: string;
  closeModal?: () => void;
  handleMethod?: () => void;
  processed?: boolean;
  confirmBtnTitle: string;
  includeCancel?: boolean;
}

const ConfirmPopup = ({
  header,
  closeModal,
  handleMethod,
  processed,
  confirmBtnTitle,
  includeCancel = false,
}: Props) => {
  useEffect(() => {
    if (processed) {
      closeModal && closeModal();
    }
  }, [processed, closeModal]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    handleMethod && handleMethod();
  };

  return (
    <Modal
      header={header}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      confirmBtnTitle={confirmBtnTitle}
      cancelButton={includeCancel}
    />
  );
};

export default ConfirmPopup;
