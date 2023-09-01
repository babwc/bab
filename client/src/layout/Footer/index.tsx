import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";

import "./style.scss";

const Footer = () => {
  return (
    <footer
      // className={`footer ${location.pathname === "/" ? "footer__home" : ""}`}
      className="footer"
    >
      <div className="footer__hours">
        <h4>Hours</h4>
        <span>Mon – Sat: 10:00 AM – 6:30 PM</span>
        <span>Sunday: 11:00 AM – 5:00 PM</span>
      </div>
      <div className="footer__follow">
        <ul>
          <li>
            <a
              href="https://www.facebook.com/babsrussiandelish"
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineFacebook size={30} color="#fff" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/babushka.market.and.deli/"
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineInstagram size={30} color="#fff" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__contact">
        <h4>Contact</h4>
        <span>1475 Newell Ave Walnut Creek, CA 94596</span>
        <span>info@babushkamarket.com</span>
        <span>925-210-0779</span>
      </div>
    </footer>
  );
};

export default Footer;
