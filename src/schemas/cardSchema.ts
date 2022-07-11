import Joi from "joi";

const cardCreateSchema = Joi.object({
  id: Joi.number().required(),
  type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required(),
});

export default cardCreateSchema;