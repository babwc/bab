const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_APIKEY as string);

export const sendEmail = async ({
  email,
  subject,
  content,
}: {
  email: string;
  subject: string;
  content: string;
}) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.EMAIL as string,
      subject,
      html: `
        <div style="
          height: 100%;
          width: 100%;
          padding: 20px 0;
          background-color: #333;
        ">
          <div style="
            max-width: 700px;
            width: min(95%, 700px);
            margin: 20px auto;
            border-radius: 5px;
            overflow: hidden;
            background-color: #666;
          ">
              <div style="
                  padding: 10px 0;
                  background-color: #fff;
              ">
                  <img 
                      stlye="
                          margin-left: 15px;                   
                      " 
                      src="https://www.babushkamarket.com/wp-content/uploads/2021/07/babushka-market-logo-flat-website_300x300.gif" alt="">
                </div>
                <div>
                  ${content}
                </div>
          </div>
          <p style="
              color: #fff;
              margin: 0;
              text-align: center;
              padding: 15px 0;
          ">Babushka Market, Deli & Cafe 1475 Newell Avenue Walnut Creek, CA, 94521</p>
        </div>
      `,
    });
  } catch (error: any) {
    return error.response.body;
  }
};
