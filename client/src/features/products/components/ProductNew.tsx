import { FormEvent } from "react";
import { useAddProductMutation } from "../../../api/services/products";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import ProductType from "./ProductType";
import ProductDepartments from "./ProductDepartments";
import ProductModifiers from "./ProductModifiers";
import ProductParent from "./ProductParent";
import ErrorMessage from "../../../components/ErrorMessage";

import useForm from "../../../hooks/useForm";
import useServerError from "../../../hooks/useServerError";

const initialValue = {
  name: "",
  department: "",
  isContainer: false,
  parent: null,
  modifiers: [],
  price: "",
  description: "",
  image: null,
};

const ProductNew = ({ closeModal }: { closeModal: () => void }) => {
  const [addProduct, { isSuccess }] = useAddProductMutation();

  const {
    value,
    setValue,
    error,
    handleChange,
    handleFocus,
    handleSubmitWrap,
  } = useForm({
    initialValue,
    requiredFields: ["name", "department", "description"],
    isSuccess,
    closeModal,
  });

  const { serverError, handleServerError } = useServerError();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(() => {
      const data: any = new FormData();

      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          if (key === "parent") {
            for (let objKey in value[key]) {
              data.append(`parent[${objKey}]`, value[key][objKey]);
            }
          } else {
            data.append(
              key,
              key === "modifiers" ? JSON.stringify(value[key]) : value[key]
            );
          }
        }
      }

      try {
        addProduct(data);
      } catch (err) {
        handleServerError(err);
      }
    });
  };

  return (
    <Modal
      header="New Product"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      confirmBtnTitle="Add"
    >
      {serverError && typeof serverError === "string" ? (
        <ErrorMessage error={serverError} />
      ) : null}
      <Input
        label={"Name"}
        name={"name"}
        handleChange={handleChange}
        handleFocus={handleFocus}
        value={value.name}
        error={error.name}
      />
      <ProductType value={value} setValue={setValue} />
      <ProductDepartments
        value={value}
        setValue={setValue}
        error={error.department}
      />
      <ProductModifiers value={value} setValue={setValue} />
      <ProductParent value={value} setValue={setValue} />
      {!value.isContainer ? (
        <>
          <Input
            label={"Price"}
            name={"price"}
            handleChange={handleChange}
            handleFocus={handleFocus}
            value={value.price}
            error={error.price}
          />
        </>
      ) : null}

      <Input
        type="file"
        label={"Image"}
        name={"image"}
        style={{ backgroundColor: "#fff" }}
        handleChange={handleChange}
      />
      <Input
        label={"Description"}
        name={"description"}
        isTextarea={true}
        style={{ marginBottom: "0" }}
        value={value.description}
        error={error.description}
        handleChange={handleChange}
        handleFocus={handleFocus}
      />
    </Modal>
  );
};

export default ProductNew;
