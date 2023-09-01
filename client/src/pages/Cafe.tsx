import PageLayout from "../layout/PageLayout";

import { CafeContainer } from "../features/cafe";

const Cafe = () => {
  return (
    <PageLayout
      title="Cafe"
      description="Sunday: 11:00 Am – 5:00 Pm. Location. Babushka Market & Deli"
      fixedHeight={true}
      noPadding={true}
    >
      <CafeContainer />
    </PageLayout>
  );
};

export default Cafe;
