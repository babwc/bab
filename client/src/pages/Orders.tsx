import PageLayout from "../layout/PageLayout";

import { OrderContainer } from "../features/orders";

const Orders = () => {
  return (
    <PageLayout title="Orders" fixedHeight={true} narrow={true}>
      <OrderContainer />
    </PageLayout>
  );
};

export default Orders;
