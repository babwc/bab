import Select from "../../../components/Select";

import { ProductTypeEnum } from "../../../ts/types";
import { IValue } from "../ts/interface";

const ProductType = ({ value, setValue }: IValue) => {
  const handleProductType = (option: ProductTypeEnum) => {
    setValue({
      ...value,
      isContainer: option === ProductTypeEnum.Container ? true : false,
    });
  };

  return (
    <Select
      title="Type"
      options={{
        chosen: value.isContainer
          ? ProductTypeEnum.Container
          : ProductTypeEnum.Item,
        list: [ProductTypeEnum.Container, ProductTypeEnum.Item],
      }}
      handleOption={handleProductType}
    />
  );
};

export default ProductType;
