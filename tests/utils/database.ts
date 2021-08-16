import { getConnection, getRepository } from 'typeorm';

import faker from 'faker';
import Degree from '../../src/entities/Degree';
import CreateDegree from '../../src/protocols/CreateDegree';
import Category from '../../src/entities/Category';
import CreateCategory from '../../src/protocols/CreateCategory';
import Instructor from '../../src/entities/Instructor';
import Period from '../../src/entities/Period';
import CreatePeriod from '../../src/protocols/CreatePeriod';
import { createExam } from '../factories/examFactory';
import { createCourse } from '../factories/courseFactory';
import * as helpers from './helpers';
import { createInstructor } from '../factories/instructorFactory';

export async function clearDatabase() {
	const connection = getConnection();
	await connection.query('DELETE FROM exams');
	await connection.query('DELETE FROM categories');
	await connection.query('DELETE FROM courses_instructors_instructors');
	await connection.query('DELETE FROM courses');
	await connection.query('DELETE FROM instructors');
	await connection.query('DELETE FROM periods');
	await connection.query('DELETE FROM degrees');

	await connection.query('ALTER SEQUENCE exams_id_seq RESTART WITH 1');
	await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
	await connection.query(
		'ALTER SEQUENCE courses_instructors_instructors_id_seq RESTART WITH 1',
	);
	await connection.query('ALTER SEQUENCE courses_id_seq RESTART WITH 1');
	await connection.query('ALTER SEQUENCE instructors_id_seq RESTART WITH 1');
	await connection.query('ALTER SEQUENCE periods_id_seq RESTART WITH 1');
	await connection.query('ALTER SEQUENCE degrees_id_seq RESTART WITH 1');
}

async function fillCourses(params: {
	instructors: Instructor[];
	degrees: Degree[];
	periods: Period[];
}) {
	const { instructors, degrees, periods } = params;
	const courses = [];
	const course1 = await createCourse({
		name: 'Calculo 1',
		instructors,
		degrees,
		periods,
		exams: [],
	});
	const course2 = await createCourse({
		name: 'Fisica 1',
		instructors,
		degrees,
		periods,
		exams: [],
	});
	const course3 = await createCourse({
		name: 'Introducao ao Meio Ambiente',
		instructors,
		degrees,
		periods,
		exams: [],
	});
	const course4 = await createCourse({
		name: 'Fisica 2',
		instructors,
		degrees,
		periods,
		exams: [],
	});
	const course5 = await createCourse({
		name: 'Calculo 4',
		instructors,
		degrees,
		periods,
		exams: [],
	});

	courses.push(course1);
	courses.push(course2);
	courses.push(course3);
	courses.push(course4);
	courses.push(course5);

	return courses;
}

async function fillCategories() {
	const categories = [];

	const p1Category = getRepository(Category).create({
		name: 'P1',
		exams: [],
	} as CreateCategory);
	await getRepository(Category).save(p1Category);

	const p2Category = getRepository(Category).create({
		name: 'P2',
		exams: [],
	} as CreateCategory);
	await getRepository(Category).save(p2Category);

	const p3Category = getRepository(Category).create({
		name: 'P3',
		exams: [],
	} as CreateCategory);
	await getRepository(Category).save(p3Category);

	const SecondChCategory = getRepository(Category).create({
		name: '2ch',
		exams: [],
	} as CreateCategory);
	await getRepository(Category).save(SecondChCategory);

	const OthersCategory = getRepository(Category).create({
		name: 'others',
		exams: [],
	} as CreateCategory);
	await getRepository(Category).save(OthersCategory);

	categories.push(p1Category);
	categories.push(p2Category);
	categories.push(p3Category);
	categories.push(SecondChCategory);
	categories.push(OthersCategory);

	return categories;
}

async function fillPeriods() {
	const periods = [];

	const firstPeriod = getRepository(Period).create({
		name: '1o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(firstPeriod);

	const secondPeriod = getRepository(Period).create({
		name: '2o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(secondPeriod);

	const thirdPeriod = getRepository(Period).create({
		name: '3o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(thirdPeriod);

	const fourthPeriod = getRepository(Period).create({
		name: '4o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(fourthPeriod);

	const fifthPeriod = getRepository(Period).create({
		name: '5o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(fifthPeriod);

	const sixthPeriod = getRepository(Period).create({
		name: '6o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(sixthPeriod);

	const seventhPeriod = getRepository(Period).create({
		name: '7o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(seventhPeriod);

	const eigthPeriod = getRepository(Period).create({
		name: '8o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(eigthPeriod);

	const ninethPeriod = getRepository(Period).create({
		name: '9o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(ninethPeriod);

	const tenthPeriod = getRepository(Period).create({
		name: '10o',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(tenthPeriod);

	const optionalPeriod = getRepository(Period).create({
		name: 'otional',
		courses: [],
	} as CreatePeriod);
	await getRepository(Period).save(optionalPeriod);

	periods.push(firstPeriod);
	periods.push(secondPeriod);
	periods.push(thirdPeriod);
	periods.push(fourthPeriod);
	periods.push(sixthPeriod);
	periods.push(seventhPeriod);
	periods.push(eigthPeriod);
	periods.push(ninethPeriod);
	periods.push(tenthPeriod);
	periods.push(optionalPeriod);

	return periods;
}

async function fillDegrees() {
	const degrees = [];
	const degree1 = getRepository(Degree).create({
		name: 'Engenharia Naval',
		courses: [],
	} as CreateDegree);
	await getRepository(Degree).save(degree1);
	const degree2 = getRepository(Degree).create({
		name: 'Engenharia Mecanica',
		courses: [],
	} as CreateDegree);
	await getRepository(Degree).save(degree2);
	const degree3 = getRepository(Degree).create({
		name: 'Engenharia Eletrica',
		courses: [],
	} as CreateDegree);
	await getRepository(Degree).save(degree3);

	degrees.push(degree1);
	degrees.push(degree2);
	degrees.push(degree3);

	return degrees;
}

async function fillInstructors() {
	const instructors = [];

	for (let i = 0; i < 8; i += 1) {
		// eslint-disable-next-line no-await-in-loop
		const instructor = await createInstructor(faker.name.findName());
		instructors.push(instructor);
	}

	return instructors;
}

export async function fillDatabase() {
	const categories = (await fillCategories()) as Category[];
	const periods = (await fillPeriods()) as Period[];
	const degrees = (await fillDegrees()) as Degree[];
	const instructors = (await fillInstructors()) as Instructor[];
	const courses = await fillCourses({ instructors, degrees, periods });

	await createExam({
		name: '2015.1',
		course: helpers.randomOf(courses),
		categories,
		fileLink: 'https://www.youtube.com/watch?v=oavMtUWDBTM',
	});
	await createExam({
		name: '2013.1',
		course: helpers.randomOf(courses),
		categories,
		fileLink: 'https://www.youtube.com/watch?v=oavMtUWDBTM',
	});
	await createExam({
		name: '2018.2',
		course: helpers.randomOf(courses),
		categories,
		fileLink: 'https://www.youtube.com/watch?v=oavMtUWDBTM',
	});
	await createExam({
		name: '2012.2',
		course: helpers.randomOf(courses),
		categories,
		fileLink: 'https://www.youtube.com/watch?v=oavMtUWDBTM',
	});
	await createExam({
		name: '2017.1',
		course: helpers.randomOf(courses),
		categories,
		fileLink: 'https://www.youtube.com/watch?v=oavMtUWDBTM',
	});
}
