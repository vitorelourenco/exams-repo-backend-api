import { getRepository } from 'typeorm';
import CreateInstructor from '../../src/protocols/CreateInstructor';
import Instructor from '../../src/entities/Instructor';

export async function createInstructor(name: string) {
	const instructor = getRepository(Instructor).create({
		name,
		exams: [],
	} as CreateInstructor);
	await getRepository(Instructor).save(instructor);
	return instructor;
}

export default {
	createInstructor,
};
