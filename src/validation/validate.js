import { ResponseError } from "../error/response-error.js";

const validate = async (schema, data) => {
  try {
    await schema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new ResponseError(400, error.details[0].message);
  }
};

export { validate };
