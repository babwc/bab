import { useState, useMemo } from "react";
import { v4 as uuid } from "uuid";

import { AnimatePresence } from "framer-motion";

import GalleryDetails from "./GalleryDetails";
import Carousel from "./Carousel";

import "./Gallery.scss";

import { Operator } from "../../../ts/types";

import galleryList from "../galleryList";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [carouselOpen, setCarouselOpen] = useState<boolean>(false);

  const images = useMemo(() => galleryList.map(({ image }) => image), []);

  const handleCarouselVisib = (index?: number) => {
    setCarouselOpen(!carouselOpen);
    index && setCurrentIndex(index);
  };

  const handleIndex = (operator: Operator) => {
    if (currentIndex < 0 || currentIndex === galleryList.length - 1) {
      return null;
    }

    setCurrentIndex((index: number) =>
      operator === Operator.Add ? ++index : --index
    );
  };

  return (
    <>
      <div className="gallery">
        <div className="gallery__list">
          {galleryList.map((imageData, index) => {
            return (
              <GalleryDetails
                key={uuid()}
                data={imageData}
                handleCarouselVisib={() => handleCarouselVisib(index)}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {carouselOpen && (
          <Carousel
            currentIndex={currentIndex}
            images={images}
            handleIndex={handleIndex}
            handleCarouselVisib={handleCarouselVisib}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
