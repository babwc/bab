import { useState, useEffect, ChangeEvent } from "react";

import {
  useGetSearchedProductsQuery,
  useGetSomeProductsQuery,
} from "../../../api/services/products";

import Select from "../../../components/Select";
import Input from "../../../components/Input";
import AppearAnim from "../../../components/AppearAnim";

import "./ProductModifiers.scss";

import { IModifier, IProduct } from "../../../ts/interfaces";
import { IValue } from "../ts/interface";

interface Props extends IValue {
  productId?: string;
}

const ProductModifiers = ({ productId, value, setValue }: Props) => {
  const [modifierValue, setModifierValue] = useState<string>("");

  const { data: modifiers } = useGetSomeProductsQuery(productId!, {
    skip: !productId,
  });

  const { data: searchedProducts, isLoading } = useGetSearchedProductsQuery(
    {
      name: modifierValue,
      exclude: value.modifiers,
      department: value.department,
      container: true,
    },
    {
      skip: !modifierValue || modifierValue.length < 3,
    }
  );

  useEffect(() => {
    if (modifiers?.length) {
      const modifiersFiltered = modifiers.map(({ _id, name }: IModifier) => {
        return { _id, name };
      });

      setValue((val) => {
        return {
          ...val,
          modifiers: [
            ...(value.modifiers as IModifier[]),
            ...modifiersFiltered,
          ],
        };
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modifiers]);

  const handleRemove = (name: string) => {
    const newModifiers = value.modifiers?.filter(
      (modifier: IModifier) => modifier.name !== name
    );

    setValue({ ...value, modifiers: newModifiers });
  };

  return value.isContainer ? (
    <Select
      title="Modifiers"
      isStatic={true}
      removable={true}
      handleRemove={handleRemove}
      options={{
        chosen: "List of modifiers",
        list: value.modifiers
          ? value.modifiers.map(
              ({ name }: { _id: string; name: string }) => name
            )
          : [],
      }}
    >
      <div className="modifiers">
        <Input
          label="Search for modifier"
          value={modifierValue}
          style={{ width: "100%" }}
          placeholder="e.g. Salami sandwich"
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setModifierValue(e.target.value)
          }
        />
        <AppearAnim
          motionKey="modifiers__options"
          inProp={!!modifierValue}
          className="modifiers__options"
        >
          <ul>
            {!isLoading &&
              searchedProducts?.map(({ _id, name, department }: IProduct) => {
                return (
                  <li
                    key={_id}
                    onClick={() => {
                      setValue((prevState: IProduct) => {
                        const newState = { ...prevState };

                        newState.modifiers = [
                          ...(newState.modifiers as IModifier[]),
                          { _id, name },
                        ];

                        if (!newState.department) {
                          newState.department = department;
                        }

                        return newState;
                      });

                      setModifierValue("");
                    }}
                  >
                    {name}
                  </li>
                );
              })}
          </ul>
        </AppearAnim>
      </div>
    </Select>
  ) : null;
};

export default ProductModifiers;
