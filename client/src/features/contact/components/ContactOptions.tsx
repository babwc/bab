import "./ContactOptions.scss";

const ContactOptions = () => {
  return (
    <div className="contact__options">
      <ul>
        <li className="contact__options__hours">
          <div className="contact__options__title">
            <h1>Market Hours</h1>
          </div>
          <div className="contact__options__value">
            <h4>Mon – Sat: 10 am – 6:30 pm</h4>
            <h4>Sunday: 11 am – 5 pm</h4>
          </div>
          <div className="contact__options__title">
            <h1>Cafe Hours</h1>
          </div>
          <div className="contact__options__value">
            <h4>Tue – Sat: 11 am – 4:00 pm</h4>
          </div>
        </li>

        <li>
          <div className="contact__options__title">
            <h1>Address</h1>
          </div>
          <div className="contact__options__value">
            <h4>1475 Newell Avenue Walnut Creek, CA, 94521</h4>
          </div>
        </li>
        <li>
          <div className="contact__options__title">
            <h1>Phone</h1>
          </div>
          <div className="contact__options__value">
            <h4>(925) 210-0779</h4>
          </div>
        </li>
        <li>
          <div className="contact__options__title">
            <h1>Mail</h1>
          </div>
          <div className="contact__options__value">
            <h4>info@babushkamarket.com</h4>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactOptions;
