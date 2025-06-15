import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { notFoundRoutes } from "./app/middleware/notFoundRoutes";
import { StoreRoutes } from "./app/modules/Store/store.routes";
import { PaymentRoutes } from "./app/modules/Payment/payment.routes";
import { MessageRoutes } from "./app/modules/Message/message.routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://shoe.infinityhubbd.online",
    "https://shoes-sever.vercel.app",
    "https://sellercenter.shoe.infinityhubbd.online",
    "https://sandbox.sslcommerz.com",
    "https://securepay.sslcommerz.com",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1", StoreRoutes);

//payment
app.use("/payment", PaymentRoutes);

//message
app.use("/comfirmation", MessageRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment server is running successfully",
  });
});

app.use(globalErrorHandler);
app.use(notFoundRoutes);

export default app;
