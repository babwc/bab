import { useState, Dispatch, SetStateAction } from "react";

import { AnimatePresence } from "framer-motion";

import DatePicker from "../../../components/DatePicker";
import InputAdditional from "./shared/InputAdditional";

import "./OrderDate.scss";
import { IOrderDetails } from "../interfaces";

const OrderDate = ({
  value,
  setValue,
  inputError,
}: {
  value: IOrderDetails;
  setValue: Dispatch<SetStateAction<IOrderDetails>>;
  inputError: string;
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const handleList = () => {
    setDatePickerOpen((dp: boolean) => !dp);
  };

  return (
    <div className="order-date">
      <InputAdditional
        label={"Pick up by"}
        value={value.date}
        name="date"
        inputError={inputError}
        readOnly={true}
        handleClick={handleList}
      />
      <AnimatePresence initial={false}>
        {datePickerOpen && (
          <DatePicker
            closeModal={handleList}
            handleDate={(date: string) => setValue({ ...value, date })}
            settings={{
              monthsAvailable: 3,
              dayInterval: 3,
              timeFrom: 10,
              timeMax: 17,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderDate;
