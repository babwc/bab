const fetch = require("node-fetch");

export const recapValidate = async (token: string) => {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    }
  );

  const data: any = await response.json();

  return data.success;
};
