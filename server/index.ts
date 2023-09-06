require("dotenv").config();

import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import auth from "./routes/auth";
import user from "./routes/user";
import order from "./routes/order";
import cart from "./routes/cart";
import product from "./routes/product";
import settings from "./routes/settings";
import catering from "./routes/catering";
// import cateringCategory from "./routes/cateringCategory";
import contact from "./routes/contact";

import { runTasks } from "./utils/scheduler";

dotenv.config();

const app: Express = express();
// const __dirname = path.resolve();
app.use(bodyParser.json());
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5552;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI as string);

app.use("/settings", settings);
app.use("/auth", auth);
app.use("/cart", cart);
app.use("/user", user);
app.use("/order", order);
app.use("/product", product);
app.use("/contact", contact);
app.use("/catering", catering);

runTasks();

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});
