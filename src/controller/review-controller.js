import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import reviewService from "../services/review-service.js";

export const getAllreview = async (req, res, next) => {
  try {
    const result = await reviewService.getAllreview();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.userId;
    const request = req.body;

    const result = await reviewService.createReview(
      req.body.doctor,
      request,
      req.body.user
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Review submitted",
    });
  } catch (error) {
    next(error);
  }
};

export default { getAllreview, createReview };
