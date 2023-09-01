export const validateTime = () => {
  const now = new Date();
  const opening = new Date();
  const closing = new Date();
  const dayTitle = now.toLocaleString("en-us", { weekday: "long" });

  opening.setHours(10);
  opening.setMinutes(0);
  opening.setSeconds(0);

  closing.setHours(dayTitle === "Sunday" ? 17 : 18);
  closing.setMinutes(dayTitle === "Sunday" ? 0 : 30);
  closing.setSeconds(0);

  return now > opening && now < closing;
};
