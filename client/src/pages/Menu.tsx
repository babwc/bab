import PageLayout from "../layout/PageLayout";

import { MenuContainer } from "../features/menu";

const Menu = () => {
  return (
    <PageLayout
      title="Menu"
      description="The best of Eastern European cousine"
      style={{ background: "#333" }}
      noPadding={true}
    >
      <MenuContainer />
    </PageLayout>
  );
};

export default Menu;
