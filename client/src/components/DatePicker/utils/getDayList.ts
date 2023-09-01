export const getDaysInMonth = (
  month: number,
  year: number,
  dayInterval: number
) => {
  const now = new Date();

  var date = new Date(year, month, 1);
  var days = [];

  now.setDate(now.getDate() + (dayInterval - 1));

  while (Number(date.getMonth()) === month) {
    if (date.getTime() > now.getTime()) {
      days.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return days;
};
