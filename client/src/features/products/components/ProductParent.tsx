import { useState } from "react";

import { useGetSearchedProductsQuery } from "../../../api/services/products";
import { MdDelete } from "react-icons/md";

import Input from "../../../components/Input";

import "./ProductParent.scss";

import { IParent } from "../../../ts/interfaces";
import { IValue } from "../ts/interface";

const ProductParent = ({ value, setValue }: IValue) => {
  const [parentValue, setParentValue] = useState<string>("");

  const { data: products, isFetching } = useGetSearchedProductsQuery(
    { name: parentValue },
    {
      skip: !parentValue,
    }
  );

  const handleClick = ({ _id, name, department }: IParent) => {
    setValue({
      ...value,
      department,
      parent: { _id, name, department },
    });

    setParentValue("");
  };

  return !value.isContainer ? (
    <div className="product__parent">
      {value.parent ? (
        <>
          <div className="product__parent__label">
            <h4>Modifier of (optional)</h4>
          </div>
          <div className="product__parent__chosen">
            <span>{(value.parent as IParent).name}</span>
            <div
              className="product__parent__delete"
              onClick={() => setValue({ ...value, parent: null })}
            >
              <MdDelete size={20} color={"#b30000"} />
            </div>
          </div>
        </>
      ) : (
        <Input
          label="Modifier of (optional)"
          placeholder="Search for e.g.: Salami sandwich"
          value={parentValue}
          handleChange={(e) => setParentValue(e.target.value)}
        />
      )}
      <div className="product__parent__options">
        <ul>
          {!isFetching &&
            products?.map(({ _id, name, department }: any) => {
              return (
                <li
                  key={_id}
                  onClick={() => handleClick({ _id, name, department })}
                >
                  {name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  ) : null;
};

export default ProductParent;
