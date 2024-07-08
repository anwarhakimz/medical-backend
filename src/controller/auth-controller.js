import authService from "../services/auth-service.js";

const register = async (req, res, next) => {
  try {
    const request = req.body;

    await authService.register(request);

    res.status(200).json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const { token, data, role } = await authService.login(request);

    res.status(200).json({
      success: true,
      message: "Successfully Login",
      token,
      data: data,
      role,
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register };
