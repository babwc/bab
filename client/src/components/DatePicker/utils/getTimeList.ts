export const getTimeList = (from: number, to: number) => {
  const start = new Date();
  const end = new Date();

  start.setHours(from, 0, 0);
  end.setHours(to, 0, 0);

  const timeList = [];

  while (start <= end) {
    timeList.push(
      start.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" })
    );

    start.setMinutes(start.getMinutes() + 30);
  }

  return timeList;
};
