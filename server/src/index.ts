import cors from "cors";
import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.Route.js";
import foodRoutes from "./routes/food.routes.js";
import adminMenuAndInventoryRoutes from "./routes/admin.route.js";
import orderRoutes from "./routes/order.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { apiLimiter } from "./middlewares/ratelimiter.js";

const port = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: ["https://restaurant-order-management-system-ashen.vercel.app"],
    credentials: true,
  }),
);

pool
  .connect()
  .then(() => {
    console.log("Connected to database successully ");
  })
  .catch((error) => console.log(error));

// middlewares

app.use(apiLimiter);
app.use(cookieParser());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", foodRoutes);
app.use("/api/admin/", adminMenuAndInventoryRoutes);
app.use("/api/order", orderRoutes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: "true", message: "Hello Word " });
});

app.listen(port, () => {
  console.log(`Server started at port number ${port}`);
});
