import { ResponseError } from "../error/response-error.js";

import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import Booking from "../models/BookingSchema.js";
const update = async (id, request) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  if (request.password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.password, salt);

    request.password = hashPassword;
  }

  return User.updateOne({ id }, { $set: request });
};

const remove = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const getSingle = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const getAll = async () => {
  const user = await User.find({}).select("-password");

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const getUserProfile = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  const { password, ...data } = user._doc;

  return data;
};

const getMyAppointment = async (userId) => {
  const bookings = await Booking.find({ user: userId });

  const doctorId = bookings.map((el) => el.doctor.id);

  const doctor = await Doctor.find({ _id: { $in: doctorId } }).select(
    "-password"
  );

  return doctor;
};

export default {
  update,
  remove,
  getSingle,
  getAll,
  getUserProfile,
  getMyAppointment,
};
