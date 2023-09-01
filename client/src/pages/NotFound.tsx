import PageLayout from "../layout/PageLayout";

const NotFound = () => {
  return (
    <PageLayout>
      <div
        style={{
          height: "calc(100vh - 200px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Page is not found</h2>
      </div>
    </PageLayout>
  );
};

export default NotFound;
