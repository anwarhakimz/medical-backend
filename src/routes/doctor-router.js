import express from "express";
import doctorController from "../controller/doctor-controller.js";
import { authenticate, restrict } from "../middleware/auth-middleware.js";
import { reviewRouter } from "./review-router.js";

const doctorRouter = new express.Router();

doctorRouter.use("/:doctorId/reviews", reviewRouter);

doctorRouter.put(
  "/:id",
  authenticate,
  restrict([`doctor`]),
  doctorController.update
);
doctorRouter.delete(
  "/:id",
  authenticate,
  restrict([`doctor`]),
  doctorController.remove
);
doctorRouter.get("/:id", doctorController.getSingle);
doctorRouter.get("/", doctorController.getAll);
doctorRouter.get(
  "/profile/me",
  authenticate,
  restrict(["doctor"]),
  doctorController.getDoctorProfile
);

export { doctorRouter };
