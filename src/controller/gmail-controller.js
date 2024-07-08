import gmailService from "../services/gmail-service.js";

const sendGmail = async (req, res, next) => {
  try {
    const { subject, text, from } = req.body;

    const result = await gmailService.sendGmail(subject, text, from);

    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { sendGmail };
