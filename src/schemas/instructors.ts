import joi from "joi"

export const queryCourseId = joi.string().pattern(/^[0-9]+$/).required();