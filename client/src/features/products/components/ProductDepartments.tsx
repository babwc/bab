import Select from "../../../components/Select";

import { departments } from "../constants";

import "./ProductDepartments.scss";

import { IContainer } from "../../../ts/interfaces";
import { IValue } from "../ts/interface";

interface Props extends IValue {
  error: string;
}

const ProductDepartments = ({ value, setValue, error }: Props) => {
  const parent = value.parent;

  return (
    <>
      <Select
        title={"Department"}
        error={error}
        options={{ list: departments, chosen: value.department }}
        handleOption={
          parent && (parent as IContainer).department
            ? undefined
            : (department: string) => setValue({ ...value, department })
        }
        isDisabled={!!parent}
      />
    </>
  );
};

export default ProductDepartments;
