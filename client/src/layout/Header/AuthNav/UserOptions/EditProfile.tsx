import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import ProfileModal from "./ProfileModal";

const EditProfile = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <div className="user-options__option" onClick={handleModal}>
        Edit Profile
      </div>

      {modalOpen && (
        <AnimatePresence>
          <ProfileModal handleModal={handleModal} />
        </AnimatePresence>
      )}
    </>
  );
};

export default EditProfile;
