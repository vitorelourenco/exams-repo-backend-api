import joi from 'joi';

const degree = joi.object({
	name: joi.string().min(1).required(),
	id: joi.number().integer().min(1).required(),
});

export const degreesArr = joi.array().items(degree);

export const degreeDrive = joi.array().items(joi.object({
	name: joi.string().min(1).required(),
	id: joi.number().integer().min(1).required(),
	courses: joi.array(),
}));
