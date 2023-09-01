import { useState, ChangeEvent } from "react";

import Input from "../Input";
import Button from "../Button";

import "./style.scss";

const ContactForm = () => {
  const [value, setValue] = useState<{
    name: string;
    email: string;
    phone: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact__form">
      <div className="contact__form__header">
        <h1>Send a message</h1>
      </div>
      <form>
        <Input
          placeholder="Name"
          value={value.name}
          name="name"
          style={style}
          handleChange={handleChange}
        />
        <Input
          placeholder="Phone"
          value={value.phone}
          name="phone"
          style={style}
          handleChange={handleChange}
        />
        <Input
          placeholder="Email"
          value={value.email}
          name="email"
          style={style}
          handleChange={handleChange}
        />
        <Input
          placeholder="Message"
          value={value.message}
          isTextarea={true}
          name="message"
          style={style}
          handleChange={handleChange}
        />
        <Button>Send</Button>
      </form>
    </div>
  );
};

export default ContactForm;

const style = {
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  height: "40px",
};
