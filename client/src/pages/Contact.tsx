import PageLayout from "../layout/PageLayout";

import { ContactContainer } from "../features/contact";

const Contact = () => {
  return (
    <PageLayout
      style={{ padding: "0" }}
      title="Contact"
      description="Telephone (925) 210-0779 info@babushkamarket.com 1475 Newell Avenue Walnut Creek, CA, 94521 Hours: Mon – Sat: 10 am – 6:30 pm Sunday: 11 am – 5 pm."
    >
      <ContactContainer />
    </PageLayout>
  );
};

export default Contact;
