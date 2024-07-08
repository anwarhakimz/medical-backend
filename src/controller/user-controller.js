import userService from "../services/user-service.js";

const update = async (req, res, next) => {
  try {
    const request = req.body;
    const id = req.params.id;

    const result = await userService.update(id, request);
    res.status(200).json({
      success: true,
      data: result,
      message: "Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;

    await userService.remove(id);
    res.status(200).json({
      success: true,
      message: "Remove successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await userService.getSingle(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await userService.getAll();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const id = req.userId;

    const result = await userService.getUserProfile(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyAppointment = async (req, res, next) => {
  try {
    const id = req.userId;

    const result = await userService.getMyAppointment(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  update,
  remove,
  getSingle,
  getAll,
  getUserProfile,
  getMyAppointment,
};
