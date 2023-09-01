import { useAddCateringDishMutation } from "../../../../api/services/catering";

import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import CateringCategory from "./CateringCategory";
import ErrorMessage from "../../../../components/ErrorMessage";

import useForm from "../../../../hooks/useForm";
import usePopup from "../../../../hooks/usePopup";
import useServerError from "../../../../hooks/useServerError";

import "./CateringDishNew.scss";

import { RegularFunction } from "../../../../ts/types";
import { ICateringNew } from "../../../../ts/interfaces";

const initialValue: ICateringNew = {
  name: "",
  category: "",
  price: "",
  description: "",
  image: "",
};

const CateringDishNew = ({ closeModal }: { closeModal: RegularFunction }) => {
  const [addDish] = useAddCateringDishMutation();

  const {
    value,
    setValue,
    error,
    handleChange,
    handleFocus,
    handleSubmitWrap,
  } = useForm({
    initialValue,
    closeModal,
    isSuccess: false,
    requiredFields: Object.keys(initialValue).filter((key) => key !== "price"),
  });

  const { popupOpen, ref, handleToggle } = usePopup();

  const { serverError, handleServerError } = useServerError();

  const getCategory = (category: string) => {
    if (category !== value.category) setValue({ ...value, category });
    handleToggle();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(async () => {
      const data: any = new FormData();

      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          data.append(key, value[key]);
        }
      }

      try {
        const result = await addDish(data).unwrap();

        result && closeModal();
      } catch (err) {
        handleServerError(err);
      }
    });
  };

  return (
    <Modal
      header="New Catering Dish"
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
      <Input
        label={"Price"}
        name={"price"}
        handleChange={handleChange}
        handleFocus={handleFocus}
        value={value.price}
        error={error.price}
      />
      <div ref={ref} className="catering-ctg">
        <Input
          label={"Category"}
          name={"Category"}
          readOnly={true}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleClick={handleToggle}
          value={value.category || "Choose a category"}
          error={error.name}
        />
        {popupOpen ? (
          <CateringCategory
            getCategory={getCategory}
            handleToggle={handleToggle}
          />
        ) : null}
      </div>

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

export default CateringDishNew;
