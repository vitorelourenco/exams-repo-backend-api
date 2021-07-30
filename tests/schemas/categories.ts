import joi from "joi";

const category = joi.object({
  name: joi.string().min(1).required(),
  id: joi.number().integer().min(1).required(),
});

export const categoriesArr = joi.array().items(category);
