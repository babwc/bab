import cron from "node-cron";

import User from "../model/User";
import Order from "../model/Order";

export const runTasks = () => {
  cron.schedule("0 0 0 * * *", async () => {
    // Removing unconfirmed accounts

    (async () => {
      const now = new Date();
      const date = new Date(now.setHours(now.getHours() - 3));

      await User.deleteMany({ active: false, createdAt: { $lt: date } });
    })();

    // Removing orders that are older than 3 months

    (async () => {
      const now = new Date();
      const date = new Date(now.setMonth(now.getMonth() - 3));

      await Order.deleteMany({ createdAt: { $lt: date } });
    })();
  });
};
