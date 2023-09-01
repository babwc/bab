import { useState } from "react";

import MenuList from "./MenuList";
import Gallery from "./Gallery";

import { Cafe_Section } from "../types";

import "./MenuContainer.scss";

export const MenuContainer = () => {
  const [currentSection, setCurrentSection] = useState<Cafe_Section>(
    Cafe_Section.Menu
  );

  return (
    <div className="cafe__container">
      <div className="cafe__options">
        <div className="cafe__options__content">
          <div
            className="cafe__option"
            onClick={() => setCurrentSection(Cafe_Section.Menu)}
          >
            <h1>Menu</h1>
          </div>
          <div
            className="cafe__option"
            onClick={() => setCurrentSection(Cafe_Section.Gallery)}
          >
            <h1>Gallery</h1>
          </div>
          <span
            className={`cafe__options__indicator ${
              currentSection === Cafe_Section.Gallery ? "moved" : ""
            }`}
          />
        </div>
      </div>
      {currentSection === Cafe_Section.Menu ? <MenuList /> : <Gallery />}
    </div>
  );
};
