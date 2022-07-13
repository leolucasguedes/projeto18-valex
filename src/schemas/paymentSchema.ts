import Joi from "joi";

const passwordRegex = /^\d{4}$/;
const buySchema = Joi.object({
  password: Joi.string().length(4).pattern(passwordRegex).required(),
  businessId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().required(),
});

export default buySchema;
