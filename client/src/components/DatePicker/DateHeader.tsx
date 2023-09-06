import { useEffect, Dispatch, SetStateAction } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import { v4 as uuid } from "uuid";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import usePopup from "../../hooks/usePopup";

import { getMonths } from "./utils/getMonth";

import "./DateHeader.scss";

const nextMonths = (amount: number) => {
  return Array.from({ length: amount }, (_, i) => i + 1).map((num) => {
    const now = new Date();
    now.setDate(now.getDate() + 1);

    now.setMonth(now.getMonth() + (num - 1), 1);

    return { id: uuid(), date: now };
  });
};

const DateHeader = ({
  month,
  setMonth,
  dayInterval,
  monthsAvailable,
}: {
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
  dayInterval: number;
  monthsAvailable: number;
}) => {
  const { popupOpen, ref, handleToggle } = usePopup(true);

  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + dayInterval);

    setMonth(String(now.getMonth()));
  }, [dayInterval, setMonth]);

  return (
    <div ref={ref} className="date-time-picker__header">
      <div className="date-time-picker__header__title">
        <div className="date-time-picker__header__wrap" onClick={handleToggle}>
          <h3>{getMonths(month)}</h3>
          <div className="date-time-picker__header__icon">
            <AiFillCaretDown size={20} color="#fff" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            key={"month-list"}
            className="date-time-picker__month-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul>
              {nextMonths(monthsAvailable).map(
                ({ id, date }: { id: string; date: Date }) => {
                  return (
                    <li
                      key={id}
                      onClick={() => setMonth(String(date.getMonth()))}
                    >
                      {getMonths(date)}
                    </li>
                  );
                }
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateHeader;
