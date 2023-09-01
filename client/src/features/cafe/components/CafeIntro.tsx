import { Link } from "react-router-dom";

import "./CafeIntro.scss";

const CafeIntro = () => {
  return (
    <div className="cafe">
      <div className="cafe-intro">
        <Link to={"/menu"}>
          <div className="cafe-intro__body">
            <h1 className="cafe-intro__label">Cafe</h1>
            <div className="cafe-intro__btn">
              <h1>Cafe</h1>
            </div>
          </div>
        </Link>
      </div>
      <div className="cafe-intro">
        <Link to={"/banquet"}>
          <div className="cafe-intro__body">
            <h1 className="cafe-intro__label">Banquet</h1>
            <div className="cafe-intro__btn">
              <h1>Banquet</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CafeIntro;
