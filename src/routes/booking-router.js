import express from "express";
import { authenticate } from "../middleware/auth-middleware.js";
import bookingController from "../controller/booking-controller.js";

const bookingRouter = new express.Router();

bookingRouter.post(
  "/checkout-session/:doctorId",
  authenticate,
  bookingController.getCheckoutSession
);

export { bookingRouter };
