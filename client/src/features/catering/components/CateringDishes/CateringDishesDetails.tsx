import { AnimatePresence, motion } from "framer-motion";

import DescrPopup from "../../../../components/DescrPopup";

import usePopup from "../../../../hooks/usePopup";

import { BsInfoCircleFill } from "react-icons/bs";

import "./CateringDishesDetails.scss";

import { IDish } from "../../../../ts/interfaces";

const CateringDishesDetails = ({
  dish,
  index,
}: {
  dish: IDish;
  index: number;
}) => {
  const { popupOpen, handleToggle, refExeption } = usePopup();

  const { _id, image, name, description } = dish;

  return (
    <>
      <motion.div
        key={_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 * index }}
        className="catering-dishes__details"
        style={{
          backgroundImage: `url(/uploads/${image})`,
        }}
      >
        <div className="catering-dishes__details__content">
          <div className="catering-dishes__name">
            <h1>{name}</h1>
          </div>
          <div
            ref={refExeption}
            className="catering-dishes__info"
            onClick={handleToggle}
          >
            <BsInfoCircleFill size={25} color="#fff" />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {popupOpen && (
          <DescrPopup handleToggle={handleToggle}>{description}</DescrPopup>
        )}
      </AnimatePresence>
    </>
  );
};

export default CateringDishesDetails;
