import joi from "joi";

export const examsByCategorySchema = joi.array().items(joi.object({
  id: joi.number().integer().min(1).required(),
  name: joi.string().min(1).required(),
  exams: joi.array().items(joi.object({
    id: joi.number().integer().min(1).required(),
    name: joi.string().min(1).required(),
    fileLink: joi.string().min(1).required(),
    instructor: joi.object({
      id: joi.number().integer().min(1).required(),
      name: joi.string().min(1).required(),
    }),
    course: joi.object({
      id: joi.number().integer().min(1).required(),
      name: joi.string().min(1).required(),
      degree: joi.object({
        id: joi.number().integer().min(1).required(),
        name: joi.string().min(1).required(),
      })
    })
  }))
}))
 