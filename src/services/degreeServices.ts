import { getRepository } from 'typeorm';
import Degree from '../entities/Degree';
import CreateDegree from '../protocols/CreateDegree';

export async function getAll() {
	const degrees = await getRepository(Degree).find();
	return degrees;
}

export async function create(degree: CreateDegree) {
	const newDegree = getRepository(Degree).create(degree);
	await getRepository(Degree).save(newDegree);
	return newDegree;
}

export async function getDriveInfo(degreeId: number) {
	const drive = await getRepository(Degree).findOne({
		where: { id: degreeId },
		relations: [
			'courses',
			'courses.period',
			'courses.instructors',
			'courses.exams',
			'courses.exams.instructor',
			'courses.exams.category',
		],
	});
	return drive;
}
