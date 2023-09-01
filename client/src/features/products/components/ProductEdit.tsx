import { FormEvent, useEffect } from "react";
import { MdDelete } from "react-icons/md";

import {
  useGetOneQuery,
  useDeleteImageMutation,
  useUpdateProductMutation,
} from "../../../api/services/products";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import ProductDepartments from "./ProductDepartments";
import ProductModifiers from "./ProductModifiers";
import ProductParent from "./ProductParent";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

import useForm from "../../../hooks/useForm";
import useServerError from "../../../hooks/useServerError";

import "./ProductEdit.scss";

import { IProduct, IProductNew } from "../../../ts/interfaces";

const initialValue = {
  id: "",
  name: "",
  department: "",
  isContainer: false,
  parent: null,
  modifiers: [],
  price: "",
  description: "",
  image: null,
};

const ProductEdit = ({
  productId,
  closeModal,
}: {
  productId: string;
  closeModal: () => void;
}) => {
  const { data, isLoading: isLoadingProductData } = useGetOneQuery(productId);
  const [imgDelete] = useDeleteImageMutation();
  const [productUpdate, { isSuccess: isProductUpdateSuccess }] =
    useUpdateProductMutation();

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
    closeModal,
    isSuccess: isProductUpdateSuccess,
  });

  const { serverError, handleServerError } = useServerError();

  useEffect(() => {
    if (data) {
      const {
        _id: id,
        name,
        price,
        description,
        department,
        image,
        parent,
        isContainer,
      } = data;

      setValue({
        ...value,
        id,
        name,
        price,
        department,
        isContainer,
        parent: parent
          ? { _id: (parent as IProduct)._id, name: (parent as IProduct).name }
          : null,
        image,
        description,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(() => {
      const { image } = value;

      try {
        const submutUpdate = async (input: unknown) => {
          await productUpdate(input as IProductNew);
        };

        if (image) {
          if (typeof image === "string") {
            submutUpdate(value);
          } else {
            const data = new FormData();

            for (let key in value) {
              if (value.hasOwnProperty(key)) {
                data.append(key, value[key]);
              }
            }

            submutUpdate(data);
          }
        } else {
          submutUpdate(value);
        }
      } catch (err) {
        handleServerError(err);
      }
    });
  };

  if (isLoadingProductData) return <Loading />;

  return data ? (
    <Modal
      header="Edit Product"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      confirmBtnTitle="Save"
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
      <ProductDepartments
        value={value}
        setValue={setValue}
        error={error.departments}
      />
      {value.isContainer ? (
        <ProductModifiers
          productId={data._id}
          value={value}
          setValue={setValue}
        />
      ) : (
        <>
          <ProductParent value={value} setValue={setValue} />
          <Input
            label={"Price"}
            name={"price"}
            handleChange={handleChange}
            handleFocus={handleFocus}
            value={value.price}
            error={error.price}
          />
        </>
      )}
      {value.image && typeof value.image === "string" ? (
        <div className="product-edit__image">
          <div className="product-edit__image__display">
            <img
              src={`/uploads/${data?.image}`}
              alt={data?.name}
              style={{ height: "90%" }}
            />
            <MdDelete
              size={23}
              color={"#b30000"}
              onClick={async () => {
                await imgDelete(productId);
                setValue({ ...value, image: null });
              }}
            />
          </div>
          <Input
            type="text"
            label={"Image"}
            name={"image"}
            style={{ backgroundColor: "#fff" }}
            handleChange={handleChange}
          />
        </div>
      ) : (
        <Input
          type="file"
          label={"Image"}
          name={"image"}
          style={{ backgroundColor: "#fff" }}
          handleChange={handleChange}
        />
      )}
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
  ) : (
    <Loading />
  );
};

export default ProductEdit;
