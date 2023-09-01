import PageLayout from "../layout/PageLayout";
import { AuthContainer } from "../features/auth";

const Auth = () => {
  return (
    <PageLayout title="Authentication" fixedHeight={true}>
      <AuthContainer />
    </PageLayout>
  );
};

export default Auth;
