import express from "express";
import { authenticate, restrict } from "../middleware/auth-middleware.js";
import reviewController from "../controller/review-controller.js";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(reviewController.getAllreview)
  .post(authenticate, restrict(["patient"]), reviewController.createReview);

export { reviewRouter };
