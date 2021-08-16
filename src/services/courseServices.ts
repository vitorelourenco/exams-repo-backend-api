import { getRepository } from 'typeorm';
import Degree from '../entities/Degree';
import Period from '../entities/Period';
import { DeepValidationError } from '../utils/errors';

export async function getWithDegreeIdByPeriod(degreeId: number) {
	const degree = await getRepository(Degree).findOne({ where: { id: degreeId } });
	if (!degree) throw new DeepValidationError(404, 'Invalid Request', `degreeId=${degreeId} not found`);

	const coursesByPeriod = await getRepository(Period)
		.createQueryBuilder('period')
		.leftJoinAndSelect('period.courses', 'course')
		.leftJoinAndSelect('course.degree', 'degree')
		.where('course.degree = :degreeId', { degreeId })
		.getMany();

	return coursesByPeriod;
}

export default {
	getWithDegreeIdByPeriod,
};
