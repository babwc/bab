import useDebounce from "../../hooks/useDebounce";

import "./style.scss";

const Switch = ({
  isOn,
  title,
  handleSwitch,
}: {
  isOn: boolean;
  title: string;
  isLoading?: boolean;
  handleSwitch?: () => void;
}) => {
  const { blocked, debounce } = useDebounce(1000);

  const _handleSwitch = () => {
    debounce(handleSwitch!);
  };

  return (
    <div className="switch">
      <h4>{title}</h4>
      <div
        className={`switch__box 
            ${isOn ? "on" : ""} 
            ${blocked ? "blocked" : ""}
        `}
        onClick={_handleSwitch}
      >
        <div className="switch__ball" />
      </div>
    </div>
  );
};

export default Switch;
