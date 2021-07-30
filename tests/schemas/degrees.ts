import joi from "joi";

const degree = joi.object({
  name: joi.string().min(1).required(),
  id: joi.number().integer().min(1),
});

export const degreesArr = joi.array().items(degree);