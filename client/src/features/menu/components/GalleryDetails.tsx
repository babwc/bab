import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { BsInfoCircleFill } from "react-icons/bs";

import DescrPopup from "../../../components/DescrPopup";

import "./GalleryDetails.scss";

const GalleryDetails = ({
  data: { image, description },
  handleCarouselVisib,
}: {
  data: { image: string; description: string };
  handleCarouselVisib: () => void;
}) => {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const handleToggle = () => setInfoOpen((info) => !info);

  return (
    <>
      <div
        className="gallery__details"
        style={{
          backgroundImage: `url(${require(`../../../assets/images/${image}`)})`,
        }}
        onClick={handleCarouselVisib}
      >
        {description ? (
          <>
            <div
              className="gallery__details__info"
              onClick={(e: any) => {
                e.stopPropagation();
                handleToggle();
              }}
            >
              <BsInfoCircleFill size={25} color="fff" />
            </div>
            <div className="gallery__details__descr">
              <p>{description}</p>
            </div>
          </>
        ) : null}
      </div>

      {description ? (
        <AnimatePresence>
          {infoOpen && (
            <DescrPopup handleToggle={handleToggle}>{description}</DescrPopup>
          )}
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default GalleryDetails;
