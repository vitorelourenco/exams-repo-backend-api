import { getRepository } from 'typeorm';
import Category from '../entities/Category';
import Course from '../entities/Course';
import Degree from '../entities/Degree';
import Exam from '../entities/Exam';
import Instructor from '../entities/Instructor';
import CreateExam, { ReceivedExam } from '../protocols/CreateExam';
import { DeepValidationError } from '../utils/errors';

export async function create(receivedExam: ReceivedExam) {
	const degree = await getRepository(Degree).findOne({
		where: { id: receivedExam.degreeId },
	});
	const course = await getRepository(Course).findOne({
		where: { id: receivedExam.courseId },
	});
	const instructor = await getRepository(Instructor).findOne({
		where: { id: receivedExam.instructorId },
	});
	const category = await getRepository(Category).findOne({
		where: { id: receivedExam.categoryId },
	});
	const { name } = receivedExam;
	const { fileLink } = receivedExam;
	const exam: CreateExam = {
		degree,
		course,
		instructor,
		category,
		name,
		fileLink,
	};
	const newExam = getRepository(Exam).create(exam);
	await getRepository(Exam).save(newExam);
	return newExam;
}

export async function getWithInstructorIdByCategory(instructorId: number) {
	const instructor = await getRepository(Instructor).findOne({ where: { id: instructorId } });
	if (!instructor) throw new DeepValidationError(404, 'Invalid Request', `instructorId=${instructorId} not found`);

	const categories = await getRepository(Category)
		.createQueryBuilder('category')
		.leftJoinAndSelect('category.exams', 'exam')
		.leftJoinAndSelect('exam.instructor', 'instructor')
		.leftJoinAndSelect('exam.course', 'course')
		.leftJoinAndSelect('course.degree', 'degree')
		.where('exam.instructor = :instructorId', { instructorId })
		.getMany();

	return categories;
}

export async function getWithCourseIdByCategory(courseId: number) {
	const course = await getRepository(Course).findOne({ where: { id: courseId } });
	if (!course) throw new DeepValidationError(404, 'Invalid Request', `instructorId=${courseId} not found`);

	const categories = await getRepository(Category)
		.createQueryBuilder('category')
		.leftJoinAndSelect('category.exams', 'exam')
		.leftJoinAndSelect('exam.instructor', 'instructor')
		.leftJoinAndSelect('exam.course', 'course')
		.leftJoinAndSelect('course.degree', 'degree')
		.where('exam.course = :courseId', { courseId })
		.getMany();

	return categories;
}
