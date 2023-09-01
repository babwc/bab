import PageLayout from "../layout/PageLayout";

import { BanquetContaner } from "../features/banquet";

const Banquet = () => {
  return (
    <PageLayout
      title="Banquet"
      description="Banquet menu"
      style={{ background: "#333" }}
      noPadding={true}
    >
      <BanquetContaner />
    </PageLayout>
  );
};

export default Banquet;
