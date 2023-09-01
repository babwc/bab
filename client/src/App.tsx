import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { useEffect } from "react";
import { useAppDispatch } from "./api/store";

import { useRefreshTokenQuery } from "./api/services/auth";
import { useGetSettingDataQuery } from "./api/services/settings";

import { setCredentials } from "./features/auth/authSlice";

import Protected from "./components/Protected";

import Header from "./layout/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Confirm from "./pages/Confirm";
import Market from "./pages/Market";
import Product from "./pages/Product";
import Cafe from "./pages/Cafe";
import Menu from "./pages/Menu";
import Banquet from "./pages/Banquet";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Orders from "./pages/Orders";
import Catering from "./pages/Catering";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";

import Button from "./components/Button";

import useCartData from "./hooks/useCartData";

import * as storage from "./utils/localStorage";

import { Settings } from "./ts/types";

const fallbackRender = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong: {error}</p>
      <Button
        handleClick={() => {
          window.location.reload();
          resetErrorBoundary();
        }}
      >
        Refresh
      </Button>
    </div>
  );
};

const App = () => {
  const dispatch = useAppDispatch();

  const { data: tokenData } = useRefreshTokenQuery(undefined);
  const { data: prodsSettingData } = useGetSettingDataQuery(Settings.Products);

  const { modifyCartData } = useCartData();

  useEffect(() => {
    if (tokenData?.token) {
      dispatch(setCredentials({ ...tokenData, isAuth: true }));
    }
  }, [dispatch, tokenData]);

  useEffect(() => {
    const cart = storage.getCart();

    if (cart) {
      const now = new Date();
      const cartExpirationDate = new Date(cart.expiresAt);

      if (now.getTime() > cartExpirationDate.getTime()) {
        modifyCartData(() => storage.clearCart());
      }
    }
  }, [modifyCartData]);

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <main style={{ position: "relative" }}>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/confirmation" element={<Confirm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/myorders"
              element={
                <Protected requiredRoles={["admin", "user"]} isPage={true}>
                  <MyOrders />
                </Protected>
              }
            />
            <Route
              path="/orders"
              element={
                <Protected requiredRoles={["admin"]} isPage={true}>
                  <Orders />
                </Protected>
              }
            />
            <Route
              path="/market"
              element={
                prodsSettingData?.mode ? (
                  <Market />
                ) : (
                  <Protected requiredRoles={["admin"]} isPage={true}>
                    <Market />
                  </Protected>
                )
              }
            />
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/banquet" element={<Banquet />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id">
              <Route
                path=":slug"
                element={
                  prodsSettingData?.mode ? (
                    <Product />
                  ) : (
                    <Protected requiredRoles={["admin"]} isPage={true}>
                      <Product />
                    </Protected>
                  )
                }
              />
              <Route path="" element={<Product />} />
            </Route>
            <Route path="/catering" element={<Catering />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      </main>
    </ErrorBoundary>
  );
};

export default App;
