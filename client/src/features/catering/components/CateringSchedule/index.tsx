import CateringForm from "./CateringForm";

import "./style.scss";

const CateringSchedule = () => {
  return (
    <section className="catering-schedule">
      <div className="catering-schedule__header">
        <h1>Get started</h1>
      </div>
      <div className="catering-schedule__tip">
        <span>
          If you would like a to make a request for catering, please fill the
          form below
        </span>
      </div>
      <CateringForm />
    </section>
  );
};

export default CateringSchedule;
