import PageLayout from "../layout/PageLayout";

import { ProductContainer } from "../features/product";

const Product = () => {
  return (
    <PageLayout title="Product" fixedHeight={true}>
      <ProductContainer />
    </PageLayout>
  );
};

export default Product;
