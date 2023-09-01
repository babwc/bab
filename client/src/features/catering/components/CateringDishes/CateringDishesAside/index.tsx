import { useState, useEffect, useRef } from "react";
import useDebounce from "../../../../../hooks/useDebounce";

import CateringDishesTitle from "./CateringDishesTitle";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./style.scss";

enum ScrollDirection {
  Up = "UP",
  Down = "DOWN",
}

const CateringDishesAside = ({
  isSuccess,
  currentCtgId,
  cateringDishes,
  currentDish,
  changeCurrentDish,
}: any) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [movedDowm, setMovedDown] = useState<boolean>(false);
  const [reachedBottom, setReachedBottom] = useState<boolean>(false);

  const ref = useRef<any>(null);

  const { debounce } = useDebounce(300);

  useEffect(() => {
    scrollTop && setScrollTop(0);
  }, [currentCtgId]);

  useEffect(() => {
    const list = ref.current;

    if (list.clientHeight === scrollTop) {
      setReachedBottom(true);
    } else {
      reachedBottom && setReachedBottom(false);
    }

    if (scrollTop) {
      setMovedDown(true);
    } else {
      movedDowm && setMovedDown(false);
    }
  }, [scrollTop, currentCtgId]);

  const handleScroll = (direction: ScrollDirection) => {
    const list = ref.current;

    debounce(() => {
      list.scrollTo({
        top:
          direction === ScrollDirection.Down
            ? list.scrollTop + 70
            : list.scrollTop - 70,
        behavior: "smooth",
      });

      setScrollTop(
        direction === ScrollDirection.Down
          ? list.scrollTop + 70
          : list.scrollTop - 70
      );
    });
  };

  return (
    <aside className="catering-dishes__aside">
      {movedDowm ? (
        <button
          className="catering-dishes__aside__up"
          onClick={() => handleScroll(ScrollDirection.Up)}
        >
          <IoIosArrowUp size={35} color={"#fff"} />
        </button>
      ) : null}
      <ul className="catering-dishes__aside__list" ref={ref}>
        {isSuccess
          ? cateringDishes.map((dish: any) => {
              return (
                <CateringDishesTitle
                  key={dish.id}
                  currentDish={currentDish}
                  dish={dish}
                  changeCurrentDish={changeCurrentDish}
                />
              );
            })
          : null}
      </ul>
      {!reachedBottom && ref.current?.scrollHeight > 420 ? (
        <button
          className="catering-dishes__aside__down"
          onClick={() => handleScroll(ScrollDirection.Down)}
        >
          <IoIosArrowDown size={35} color={"#fff"} />
        </button>
      ) : null}
    </aside>
  );
};

export default CateringDishesAside;
