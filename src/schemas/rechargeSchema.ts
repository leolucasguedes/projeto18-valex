import Joi from "joi";

const rechargeSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().required(),
});

export default rechargeSchema;
