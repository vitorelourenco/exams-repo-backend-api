import { getRepository } from 'typeorm';
import Course from '../../src/entities/Course';
import Exam from '../../src/entities/Exam';
import * as helpers from '../utils/helpers';
import Instructor from '../../src/entities/Instructor';
import CreateCourse from '../../src/protocols/CreateCourse';
import Period from '../../src/entities/Period';
import Degree from '../../src/entities/Degree';

export async function createCourse(params: {
	name: string;
	instructors: Instructor[];
	periods: Period[];
	degrees: Degree[];
	exams: Exam[];
}) {
	const {
		name, periods, degrees, instructors, exams,
	} = params;
	const course = getRepository(Course).create({
		name,
		period: helpers.randomOf(periods),
		degree: helpers.randomOf(degrees),
		instructors: [helpers.randomOf(instructors)],
		exams,
	} as CreateCourse);
	await getRepository(Course).save(course);
	return course;
}

export default {
	createCourse,
};
