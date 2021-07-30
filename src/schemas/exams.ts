import joi from "joi";

export const newExamSchema = joi.object({
  name: joi.string().min(1).required(),
  fileLink: joi.string().uri().required(),
  instructorId: joi.number().integer().min(1).required(),
  courseId: joi.number().integer().min(1).required(),
  categoryId: joi.number().integer().min(1).required(),
  degreeId: joi.number().integer().min(1).required(),
});
