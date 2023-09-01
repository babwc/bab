import PageLayout from "../layout/PageLayout";

import { ProductsContainer } from "../features/products";

const Market = () => {
  return (
    <PageLayout
      title="Market"
      description="Here you can observe products and dishes from all over Eastern Europe"
      narrow={true}
    >
      <ProductsContainer />
    </PageLayout>
  );
};

export default Market;
