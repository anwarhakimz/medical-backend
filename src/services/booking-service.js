// services/paymentService.js
import Stripe from "stripe";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import { ResponseError } from "../error/response-error.js";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const createCheckoutSession = async (userId, doctorId, protocol, host) => {
  const doctor = await Doctor.findById(doctorId);
  const user = await User.findById(userId);

  if (!doctor || !user) {
    throw new ResponseError(404, "Doctor or User not found");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
    cancel_url: `${protocol}://${host}/doctors/${doctor.id}`,
    customer_email: user.email,
    client_reference_id: doctorId,
    line_items: [
      {
        price_data: {
          currency: "IDR",
          unit_amount: doctor.ticketPrice * 100,
          product_data: {
            name: doctor.name,
            description: doctor.bio,
            images: [doctor.photo],
          },
        },
        quantity: 1,
      },
    ],
  });

  const booking = new Booking({
    doctor: doctor._id,
    user: user._id,
    ticketPrice: doctor.ticketPrice,
    session: session.id,
  });

  await booking.save();

  return session;
};

export default { createCheckoutSession };
