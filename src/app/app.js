import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import { authRouter } from "../routes/auth-router.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/user-router.js";
import { doctorRouter } from "../routes/doctor-router.js";
import { reviewRouter } from "../routes/review-router.js";
import { bookingRouter } from "../routes/booking-router.js";
import { gmailRouter } from "../routes/gmail-router.js";

const corsOption = {
  origin: true,
};

export const app = express(json());

app.get("/", (req, res) => {
  res.send("api is working");
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/gmail", gmailRouter);
app.use(errorMiddleware);
