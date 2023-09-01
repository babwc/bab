import { useUpdateInStockMutation } from "../../../api/services/products";

import Switch from "../../../components/Switch";

const ProductStock = ({ id, inStock }: { id: string; inStock: boolean }) => {
  const [update] = useUpdateInStockMutation();

  return (
    <div className="product__instock">
      <Switch
        isOn={!!inStock}
        title="In Stock"
        handleSwitch={() => update({ id, inStock: !inStock })}
      />
    </div>
  );
};

export default ProductStock;
