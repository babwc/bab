import { useState } from "react";

import { motion } from "framer-motion";

import Modal from "../Modal";
import DateHeader from "./DateHeader";
import TimeList from "./TimeList";
import DateList from "./DateList";
import Button from "../Button";

import useFreezeBackground from "../../hooks/useFreezeBackground";

import { getMonths } from "./utils/getMonth";

import "./style.scss";

interface Props {
  height?: string;
  width?: string;
  settings: {
    dayInterval: number;
    timeFrom: number;
    timeMax: number;
    monthsAvailable: number;
  };
  handleDate: (date: string) => void;
  closeModal: () => void;
}

const DatePicker = ({
  height,
  width,
  handleDate,
  closeModal,
  settings,
}: Props) => {
  useFreezeBackground();

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    handleDate(`${day} ${getMonths(month)} ${time}`);
    closeModal && closeModal();
  };

  return (
    <motion.div
      key={"date-pick"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal closeModal={closeModal} isForm={false} includeFooter={false}>
        <div className="date-time-picker" style={{ height, width }}>
          <DateHeader
            dayInterval={settings.dayInterval}
            monthsAvailable={settings.monthsAvailable}
            month={month}
            setMonth={setMonth}
          />
          <div className="date-time-picker__body">
            <TimeList
              time={time}
              setTime={setTime}
              timeFrom={settings.timeFrom}
              timeMax={settings.timeMax}
            />
            <DateList
              month={month}
              day={day}
              setDay={setDay}
              dayInterval={settings.dayInterval}
            />
          </div>
          <div className="date-time-picker__footer">
            <Button
              handleClick={closeModal}
              additionalStyle={{ background: "#b30000" }}
            >
              Cancel
            </Button>
            <Button
              disabled={!(day && time)}
              handleClick={day && time ? handleSubmit : undefined}
            >
              Set Time
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default DatePicker;
