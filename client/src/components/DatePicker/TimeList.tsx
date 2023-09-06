import { Dispatch, SetStateAction, useMemo } from "react";

import { getTimeList } from "./utils/getTimeList";

const TimeList = ({
  time: timeState,
  setTime,
  timeFrom,
  timeMax,
}: {
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  timeFrom: number;
  timeMax: number;
}) => {
  const timeList = useMemo(
    () => getTimeList(timeFrom, timeMax),
    [timeFrom, timeMax]
  );

  return (
    <div className="date-time-picker__time">
      <ul>
        {timeList.map(({ id, time }) => {
          return (
            <li
              key={id}
              className={`${timeState === time ? "date-chosen" : ""}`}
              onClick={() => setTime(time)}
            >
              {time}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TimeList;
