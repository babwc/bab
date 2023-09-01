import { useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { RxCaretDown } from "react-icons/rx";

import usePopup from "../../../hooks/usePopup";

import { departments } from "../constants";

import "./Departments.scss";

const DepartmentList = ({
  currentDepartment,
  setCurrentDepartment,
}: {
  currentDepartment: string;
  setCurrentDepartment: Dispatch<SetStateAction<string>>;
}) => {
  const { ref, handleToggle, popupOpen: depListOpen } = usePopup();

  const location = useLocation();

  const depList = useMemo(
    () => departments.filter((dep: string) => dep !== "take out"),
    []
  );

  useEffect(() => {
    if (location.state?.title.toLowerCase() === "take out") {
      setCurrentDepartment("take out");
    } else {
      setCurrentDepartment(depList[0]);
    }
  }, [depList, location, setCurrentDepartment]);

  return (
    <div className="departments">
      <div
        className={`departments__takeout ${
          currentDepartment === "take out" ? "chosen" : ""
        }`}
        onClick={() => setCurrentDepartment("take out")}
      >
        <h4>Take Out</h4>
      </div>
      <div ref={ref} className="departments__market" onClick={handleToggle}>
        <h4>
          {currentDepartment === "take out" ? "Market" : currentDepartment}
        </h4>
        <div
          className={`departments__market__caret ${depListOpen ? "open" : ""}`}
        >
          <RxCaretDown size={30} />
        </div>
      </div>
      <div className={`departments__list ${depListOpen ? "open" : ""}`}>
        {depList.map((dep: string) => {
          return (
            <div
              key={uuid()}
              className={`departments__details ${
                dep === currentDepartment ? "chosen" : ""
              }`}
              onClick={() => {
                setCurrentDepartment(dep);
              }}
            >
              <h4>{dep}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentList;
