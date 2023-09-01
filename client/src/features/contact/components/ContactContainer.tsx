import ContactOptions from "./ContactOptions";
import ContactForm from "./ContactForm";

import "./ContactContainer.scss";

export const ContactContainer = () => {
  return (
    <div className="contact">
      <div className="contact__info">
        <ContactForm />
        <ContactOptions />
      </div>
    </div>
  );
};
