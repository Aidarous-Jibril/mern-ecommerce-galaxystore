import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import Stripe from 'stripe';
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import imgUploadRoutes from "./routes/imgUploadRoutes.js";

dotenv.config();
connectDB();


const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
//Morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", imgUploadRoutes);

//Paypal API end point
app.get("/api/config/paypal", (req, res) =>
res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV !== 'production')dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//since we use ES6 module, make __dirname accessible in ES6 module
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//set into production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} 
// else {
//   app.use('/', (req, res) => {
//     res.send('API is Running')
//   })
// }


//Stripe payment route
app.post('/stripe', (req, res) => {
  console.log(req.body)
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'sek'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode n Port ${PORT}`.yellow.bold
  );
});
