import "./style.scss";

const OpenIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="open__icon">
      <span></span>
      <span
        style={{ transform: `rotate(${isOpen ? "180deg" : "-90deg"})` }}
      ></span>
    </div>
  );
};

export default OpenIcon;
