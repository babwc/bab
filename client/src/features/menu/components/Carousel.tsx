import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";

import { motion } from "framer-motion";

import Close from "../../../components/Close";
import useFreezeBackground from "../../../hooks/useFreezeBackground";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

import "./Carousel.scss";

import { Operator } from "../../../ts/types";

const Carousel = ({
  currentIndex,
  images,
  handleIndex,
  handleCarouselVisib,
}: {
  currentIndex: number;
  images: string[];
  handleIndex: (arg0: Operator) => void;
  handleCarouselVisib: () => void;
}) => {
  useFreezeBackground();

  const sliderWidth = 100 / images.length;

  const rootElement = document.querySelector("#carousel");

  return rootElement
    ? ReactDOM.createPortal(
        <>
          <div className="carousel__close" onClick={handleCarouselVisib}>
            <Close color="#fff" />
          </div>
          <motion.div
            key={"backdrop"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={() => null}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="carousel"
          >
            <div
              className="carousel__content"
              style={{
                width: `${100 * images.length}%`,
                transform: `translateX(-${sliderWidth * currentIndex}%)`,
              }}
            >
              {images.map((img: string) => {
                return (
                  <div
                    key={uuid()}
                    className="carousel__slide"
                    style={{
                      width: `${sliderWidth}%`,
                    }}
                  >
                    <img
                      src={require(`../../../assets/images/${img}`)}
                      alt="Babushka gallery"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
          {currentIndex > 0 ? (
            <div
              className="carousel__left carousel__control"
              onClick={() => handleIndex(Operator.Subtract)}
            >
              <AiOutlineArrowLeft size={35} color="#fff" />
            </div>
          ) : null}
          {currentIndex < images.length - 1 ? (
            <div
              className="carousel__right carousel__control"
              onClick={() => handleIndex(Operator.Add)}
            >
              <AiOutlineArrowRight size={35} color="#fff" />
            </div>
          ) : null}
        </>,
        rootElement
      )
    : null;
};

export default Carousel;
