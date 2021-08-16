import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import * as courseServices from '../services/courseServices';
import * as idSchemas from '../schemas/id';
import { DeepValidationError } from '../utils/errors';

export async function getWithDegreeIdByPeriod(req: Request, res: Response) {
	try {
		const paramDegreeId = req.params.degreeId;
		const { error: joiError } = idSchemas.id.validate(paramDegreeId);
		if (joiError) throw joiError;
		const degreeId = parseInt(paramDegreeId.toString(), 10);

		const instructors = await courseServices.getWithDegreeIdByPeriod(degreeId);

		return res.send(instructors);
	} catch (err) {
		console.error(err.message);

		if (err instanceof ValidationError) {
			// eslint-disable-next-line no-underscore-dangle
			return res.status(400).send(`${err.message} => ${err._original}`);
		}

		if (err instanceof DeepValidationError) {
			return res.status(err.code).send(`${err.message} => ${err.detail}`);
		}

		return res.sendStatus(500);
	}
}

export default {
	getWithDegreeIdByPeriod,
};
