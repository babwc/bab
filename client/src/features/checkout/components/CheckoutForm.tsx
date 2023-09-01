import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../api/store";

import { selectAuthStatus } from "../../auth/authSlice";
import { selectCurrentUser } from "../../auth/authSlice";

import {
  useConfirmPaymentMutation,
  useCreatePaymentIntentMutation,
} from "../../../api/services/order";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";

import useCartData from "../../../hooks/useCartData";
import useForm from "../../../hooks/useForm";

import OrderDate from "./OrderDate";
import InputAdditional from "./shared/InputAdditional";
import ErrorMessage from "../../../components/ErrorMessage";

import "./CheckoutForm.scss";

import { IConfirmOrder } from "../../../ts/interfaces";

import * as storage from "../../../utils/localStorage";

const initialValue = { name: "", phone: "", date: "" };

export default function CheckoutForm() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [confirmPayment] = useConfirmPaymentMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const [paymentError, setPaymentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = useTypedSelector(selectAuthStatus);
  const userData = useTypedSelector(selectCurrentUser);

  const { cartData, modifyCartData } = useCartData();
  const {
    value,
    setValue,
    error: inputError,
    handleChange,
    handleSubmitWrap,
  } = useForm({
    initialValue,
    requiredFields: userData.name
      ? Object.keys(initialValue).filter((key) => key !== "name")
      : Object.keys(initialValue),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(async () => {
      try {
        if (!stripe || !elements)
          return setPaymentError("Something went wrong");

        setIsLoading(true);

        const { error: submitError } = await elements.submit();

        if (submitError) return setPaymentError(submitError.message as string);

        if (!cartData) return setPaymentError("Your cart is empty");

        const intent = await createPaymentIntent({
          items: cartData.items,
        }).unwrap();

        const { error: confirmPaymentError } = await stripe.confirmPayment({
          elements,
          clientSecret: intent.clientSecret,
          confirmParams: {
            return_url: process.env.REACT_APP_URL,
          },
          redirect: "if_required",
        });

        setIsLoading(false);

        if (confirmPaymentError) return setPaymentError("Something went wrong");

        const body: IConfirmOrder = {
          items: cartData.items,
          customer: isAuth ? userData.name : value.name,
          paymentId: intent.paymentId,
          phone: value.phone,
          date: value.date,
        };

        await confirmPayment(body);

        modifyCartData(() => storage.clearCart());

        navigate("/success", {
          state: { isAuth: !!userData.name },
        });
      } catch (error: unknown) {
        if (typeof error === "object" && error != null && "data" in error) {
          setPaymentError(error.data as string);
        }
      }
    });
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        {paymentError ? <ErrorMessage error={paymentError} /> : null}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        {!userData.name ? (
          <InputAdditional
            label={"Name"}
            value={value.name}
            name={"name"}
            handleChange={handleChange}
            inputError={inputError.name}
          />
        ) : null}
        <InputAdditional
          label={"Phone"}
          value={value.phone}
          name={"phone"}
          handleChange={handleChange}
          inputError={inputError.phone}
        />
        <OrderDate
          value={value}
          setValue={setValue}
          inputError={inputError.date}
        />
        <button
          disabled={
            isLoading || !stripe || !elements || !value.date || !value.phone
          }
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      </form>
    </>
  );
}
