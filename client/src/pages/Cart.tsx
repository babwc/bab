import PageLayout from "../layout/PageLayout";

import { CartContainer } from "../features/cart";

const Cart = () => {
  return (
    <PageLayout title="Cart" narrow={true}>
      <CartContainer />
    </PageLayout>
  );
};

export default Cart;
