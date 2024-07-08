import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      index: { expires: "7d" }, // TTL index, deletes document after 7 days
    },
  },
  { timestamps: true }
);

bookingSchema.pre("save", function (next) {
  if (this.isPaid && !this.paidAt) {
    this.paidAt = new Date();
  }
  next();
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "doctor",
    select: "name",
  });
  next();
});

export default mongoose.model("Booking", bookingSchema);
