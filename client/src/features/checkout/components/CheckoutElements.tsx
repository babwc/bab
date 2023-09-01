import { useMemo } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";

import * as storage from "../../../utils/localStorage";

import CheckoutForm from "./CheckoutForm";

const key =
  "pk_test_51NZ6d8EWRfTEMDT39c4txHchjY7wkc9hO4HMGyBoOY2tGJDQVS31TQQtpyd2l9k6Q41fCrXvFi8eFV4S1ipSizU600lI062XO9";

const stripeTestPromise = loadStripe(key);

const CheckoutElements = () => {
  const total = useMemo(() => {
    return storage
      .getCart()
      .items.reduce((total: number, { data: { price }, quantity }: any) => {
        return (total += +price * quantity);
      }, 0);
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "3px",
      borderRadius: "5px",
    },
  };

  const options: StripeElementsOptions = {
    mode: "payment",
    payment_method_types: ["card"],
    capture_method: "manual",
    amount: +(total * 100).toFixed(),
    currency: "usd",
    appearance,
  };

  return (
    <Elements options={options} stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutElements;
