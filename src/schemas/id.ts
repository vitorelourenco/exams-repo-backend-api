import joi from 'joi';

export const id = joi.string().pattern(/^[0-9]+$/).required();

export default {
	id,
};
