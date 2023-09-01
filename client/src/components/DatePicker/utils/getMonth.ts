export const getMonths = (monthNumber: string | Date) => {
  if (typeof monthNumber === "string") {
    const now = new Date();

    now.setMonth(Number(monthNumber), 1);

    return now.toLocaleString("en-us", {
      month: "long",
    });
  } else {
    return new Date(
      monthNumber.setMonth(monthNumber.getMonth())
    ).toLocaleString("en-us", {
      month: "long",
    });
  }
};
