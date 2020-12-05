import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRoutes);

//Paypal
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode n Port ${PORT}`.yellow.bold
  );
});
