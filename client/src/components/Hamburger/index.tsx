import "./style.scss";

const Hamburger = ({
  dark = true,
  isOpen,
  handleClick,
}: {
  dark?: boolean;
  isOpen: boolean;
  handleClick: () => void;
}) => {
  return (
    <div className="hamburger">
      <div
        className={`hamburger__icon ${isOpen ? "open" : ""} ${
          dark ? "dark" : "light"
        }`}
        onClick={handleClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Hamburger;
