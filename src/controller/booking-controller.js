import bookingService from "../services/booking-service.js";

const getCheckoutSession = async (req, res, next) => {
  const userId = req.userId;
  const doctorId = req.params.doctorId;
  const protocol = req.protocol;
  const host = req.get("host");

  try {
    const session = await bookingService.createCheckoutSession(
      userId,
      doctorId,
      protocol,
      host
    );
    res
      .status(200)
      .json({ success: true, messsage: "Successfully paid", session });
  } catch (error) {
    next(error);
  }
};

export default { getCheckoutSession };
