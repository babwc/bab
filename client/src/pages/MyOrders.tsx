import PageLayout from "../layout/PageLayout";

import { MyOrderContainer } from "../features/myOrders";

const Orders = () => {
  return (
    <PageLayout title="My orders" narrow={true}>
      <MyOrderContainer />
    </PageLayout>
  );
};

export default Orders;
