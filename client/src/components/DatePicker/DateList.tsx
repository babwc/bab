import { Dispatch, SetStateAction } from "react";

import { getDaysInMonth } from "./utils/getDayList";

const DateList = ({
  day,
  setDay,
  month,
  dayInterval,
}: {
  day: string;
  month: string;
  setDay: Dispatch<SetStateAction<string>>;
  dayInterval: number;
}) => {
  return (
    <div className="date-time-picker__day">
      <ul>
        {getDaysInMonth(
          Number(month),
          new Date().getFullYear(),
          dayInterval
        ).map(({ id, day: dayElem }: { id: string; day: Date }) => {
          console.log(dayElem);

          const currentDay = dayElem.getDate();
          const dayOfWeek = dayElem.toLocaleString("en-us", {
            weekday: "long",
          });

          const isAvailable = true; // to be updated

          return (
            <li
              key={id}
              className={`${!isAvailable ? "date-unavailable" : ""} ${
                day === String(currentDay) ? "date-chosen" : ""
              }`}
              onClick={() =>
                isAvailable ? setDay(String(currentDay)) : undefined
              }
            >
              {dayOfWeek}, {currentDay}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DateList;
