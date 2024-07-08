import { ResponseError } from "../error/response-error.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

const update = async (id, request) => {
  const doctor = await Doctor.findByIdAndUpdate(
    id,
    { $set: request },
    { new: true }
  );

  if (!doctor) {
    throw new ResponseError(404, "Doctor is not found");
  }

  return doctor;
};

const remove = async (id) => {
  const doctor = await Doctor.findByIdAndDelete(id);

  if (!doctor) {
    throw new ResponseError(404, "Doctor is not found");
  }

  return doctor;
};

const getSingle = async (id) => {
  const doctor = await Doctor.findById(id)
    .populate("reviews")
    .select("-password");

  if (!doctor) {
    throw new ResponseError(404, "Doctor is not found");
  }

  return doctor;
};

const getAll = async (query) => {
  let doctor;

  if (query) {
    doctor = await Doctor.find({
      isApproved: "approved",
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ],
    }).select("-password");
  } else {
    doctor = await Doctor.find({ isApproved: "approved" }).select("-password");
  }

  if (!doctor) {
    throw new ResponseError(404, "Doctor is not found");
  }

  return doctor;
};

const getDoctorProfile = async (id) => {
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    throw new ResponseError(404, "Doctor is not found");
  }

  const { password, ...data } = doctor._doc;

  const appointments = await Booking.find({ doctor: id });

  return { data, appointments };
};

export default { update, remove, getSingle, getAll, getDoctorProfile };
