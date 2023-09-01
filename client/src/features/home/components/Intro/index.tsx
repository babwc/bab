import Matreshka from "./Matreshka";

import "./style.scss";

const Intro = () => {
  return (
    <section className="intro">
      <div className="intro__content">
        <div className="intro__label">
          <h1>
            Babushka Market, Deli &{" "}
            <span className="intro__label__cafe">Cafe</span>
          </h1>
        </div>
        <div className="intro__matreshka">
          <div className="intro__matreshka__parts">
            <Matreshka />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
