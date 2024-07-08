import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validate } from "../validation/validate.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth-validation.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

const register = async (request) => {
  await validate(registerValidation, request);

  const { email, password, name, role, photo, gender } = request;

  let user = null;

  if (role === "patient") {
    user = await User.findOne({ email });
  }
  if (role === "doctor") {
    user = await Doctor.findOne({ email });
  }

  if (user) {
    throw new ResponseError(400, "Email is already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  if (role === "patient") {
    user = new User({
      name,
      email,
      password: hashPassword,
      photo,
      gender,
      role,
    });
  } else if (role === "doctor") {
    user = new Doctor({
      name,
      email,
      password: hashPassword,
      photo,
      gender,
      role,
    });
  }

  await user.save();
};

const login = async (request) => {
  await validate(loginValidation, request);

  const { email } = request;

  let user = null;

  const patient = await User.findOne({ email });
  const doctor = await Doctor.findOne({ email });

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  if (!user) {
    throw new ResponseError(401, "Username and passsword is wrong");
  }

  const isPasswordMatch = await bcrypt.compare(request.password, user.password);

  if (!isPasswordMatch) {
    throw new ResponseError(401, "Username and password is wrong");
  }

  const token = generateToken(user);

  const { password, role, appointments, ...data } = user._doc;

  return { token, data, role };
};

export default { login, register };
