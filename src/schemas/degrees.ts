import joi from 'joi';

export const newDegreeSchema = joi.object({ name: joi.string().min(1).required() });

export default {
	newDegreeSchema,
};
