import Joi from "joi";

const passwordRegex = /^\d{4}$/;
const blockCardSchema = Joi.object({
  password: Joi.string().length(4).pattern(passwordRegex).required(),
});

export default blockCardSchema;
