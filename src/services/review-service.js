import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import { ResponseError } from "../error/response-error.js";

const getAllreview = async () => {
  const review = await Review.find();

  if (!review) {
    throw new ResponseError(404, "Review is not found");
  }

  return review;
};

const createReview = async (doctorId, request) => {
  const newReview = new Review(request);

  const saveReview = await newReview.save();

  await Doctor.findByIdAndUpdate(doctorId, {
    $push: { reviews: saveReview._id },
  });

  return saveReview;
};
export default { getAllreview, createReview };
