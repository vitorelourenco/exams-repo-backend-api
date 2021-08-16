import { getRepository } from 'typeorm';
import CreateExam from '../../src/protocols/CreateExam';
import Course from '../../src/entities/Course';
import Exam from '../../src/entities/Exam';
import Category from '../../src/entities/Category';
import * as helpers from '../utils/helpers';

export async function createExam(params: {
	course: Course;
	name: string;
	fileLink: string;
	categories: Category[];
}) {
	const { course, name, fileLink, categories } = params;
	const exam = getRepository(Exam).create({
		name,
		fileLink,
		category: helpers.randomOf(categories),
		instructor: helpers.randomOf(course.instructors),
		course,
	} as CreateExam);
	await getRepository(Exam).save(exam);
}

export default {
	createExam,
};
