import PageLayout from "../layout/PageLayout";

import { HomeContainer } from "../features/home";

const Home = () => {
  return (
    <PageLayout
      title="Home"
      description="Family owned since 1996. A memorable meal and shopping experience awaits. Hidden Gem With Big Variety Of Imported And Local Goods. In Business Since 1996. Open 7 Days A Week."
      noPadding={true}
    >
      <HomeContainer />
    </PageLayout>
  );
};

export default Home;
