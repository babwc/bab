import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetOneQuery } from "../../../api/services/products";

import { BsInfoCircleFill } from "react-icons/bs";

import { AnimatePresence } from "framer-motion";

import DescrPopup from "../../../components/DescrPopup";
import ProductFooterCart from "./ProductFooterCart";
import ProductFooterDetails from "./ProductFooterDetails";

import ProductStock from "./ProductStock";

import Protected from "../../../components/Protected";
import Loading from "../../../components/Loading";

import "./ProductContainer.scss";

export const ProductContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentUid = location.pathname.split("/")[2];
  const slug = location.pathname.split("/")[3];

  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [descrOpen, setDescrOpen] = useState<boolean>(false);

  const { data: productData, isLoading: productDataLoading } =
    useGetOneQuery(currentUid);

  useEffect(() => {
    if (productData) {
      const sluggedName = productData.name.toLowerCase().replace(/\W+/g, "-");

      if (slug !== sluggedName) {
        return navigate(`/product/${currentUid}/${sluggedName}`);
      }
    }
  }, [productData, currentUid, navigate, slug]);

  if (productDataLoading) return <Loading />;

  const { _id, name, imageUrl, description, department, price, inStock } =
    productData || {};
  console.log(imageUrl);

  return productData ? (
    <>
      <div className="product">
        <div className="product__name--mobile">
          <h1>{name}</h1>
        </div>
        <div className="product__img">
          <div
            className="product__descr__icon--mobile"
            onClick={() => setDescrOpen(true)}
          >
            <BsInfoCircleFill size={35} color="#008000" />
          </div>
          <img src={imageUrl} alt={name} />
        </div>
        <div className="product__sidebar">
          <div className={`product__body ${!inStock ? "full" : ""}`}>
            <Protected requiredRoles={["admin"]}>
              <ProductStock id={_id!} inStock={inStock!} />
            </Protected>
            <div className="product__name">
              <h1>{name}</h1>
            </div>
            <div className="product__descr">
              <p>{description}</p>
            </div>
          </div>
          {inStock ? (
            <div className="product__footer">
              <ProductFooterDetails
                price={price}
                quantity={currentQuantity}
                setQuantity={setCurrentQuantity}
              />
              <ProductFooterCart
                id={_id!}
                name={name!}
                image={imageUrl!}
                department={department!}
                price={price!}
                quantity={currentQuantity}
              />
            </div>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {descrOpen && (
          <DescrPopup handleToggle={() => setDescrOpen((descr) => !descr)}>
            {description}
          </DescrPopup>
        )}
      </AnimatePresence>
    </>
  ) : null;
};
