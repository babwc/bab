import PageLayout from "../layout/PageLayout";

import { CateringContainer } from "../features/catering";

const Catering = () => {
  return (
    <PageLayout
      title="Catering"
      description="We will be glad to tailor custom menu for your event, count ideal portion size and listen to all your needs. Feel free to contact us if you have any questions. We are able to accommodate almost every dietary restrictions."
      narrow={true}
    >
      <CateringContainer />
    </PageLayout>
  );
};

export default Catering;
