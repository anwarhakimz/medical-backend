import { ResponseError } from "../error/response-error.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, errors: "No Token, Authorization Denied" })
      .end();
  }

  try {
    const token = authToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, errors: "No Token, Authorization Denied" })
      .end();
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user = null;

  user = (await User.findById(userId)) || (await Doctor.findById(userId));

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, errors: "Unauthorized" })
      .end();
  }

  next();
};
