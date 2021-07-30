import { getConnection, getRepository } from "typeorm";

import Degree from "../../src/entities/Degree";
import CreateDegree from "../../src/protocols/CreateDegree";
import Category from "../../src/entities/Category";
import CreateCategory from "../../src/protocols/CreateCategory";
import Course from "../../src/entities/Course";
import CreateCourse from "../../src/protocols/CreateCourse";
import Exam from "../../src/entities/Exam";
import CreateExam from "../../src/protocols/CreateExam";
import Instructor from "../../src/entities/Instructor";
import CreateInstructor from "../../src/protocols/CreateInstructor";
import Period from "../../src/entities/Period";
import CreatePeriod from "../../src/protocols/CreatePeriod";

export async function clearDatabase() {
  const connection = getConnection();
  await connection.query(`DELETE FROM exams`);
  await connection.query(`DELETE FROM categories`);
  await connection.query(`DELETE FROM courses_instructors_instructors`);
  await connection.query(`DELETE FROM courses`);
  await connection.query(`DELETE FROM instructors`);
  await connection.query(`DELETE FROM periods`);
  await connection.query(`DELETE FROM degrees`);

  await connection.query(`ALTER SEQUENCE exams_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE categories_id_seq RESTART WITH 1`);
  await connection.query(
    `ALTER SEQUENCE courses_instructors_instructors_id_seq RESTART WITH 1`
  );
  await connection.query(`ALTER SEQUENCE courses_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE instructors_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE periods_id_seq RESTART WITH 1`);
  await connection.query(`ALTER SEQUENCE degrees_id_seq RESTART WITH 1`);
}

export async function fillDatabase() {
  const newDegree = getRepository(Degree).create({
    name: "Engenharia Naval",
    courses: [],
  } as CreateDegree);
  await getRepository(Degree).save(newDegree);
//////////////////////////////////////////////////////
  const p1Category = getRepository(Category).create({
    name: "P1",
    exams: [],
  } as CreateCategory);
  await getRepository(Category).save(p1Category);

  const p2Category = getRepository(Category).create({
    name: "P2",
    exams: [],
  } as CreateCategory);
  await getRepository(Category).save(p2Category);

  const p3Category = getRepository(Category).create({
    name: "P3",
    exams: [],
  } as CreateCategory);
  await getRepository(Category).save(p3Category);

  const SecondChCategory = getRepository(Category).create({
    name: "2ch",
    exams: [],
  } as CreateCategory);
  await getRepository(Category).save(SecondChCategory);

  const OthersCategory = getRepository(Category).create({
    name: "others",
    exams: [],
  } as CreateCategory);
  await getRepository(Category).save(OthersCategory);
//////////////////////////////////////////////////////
  const firstInstructor = getRepository(Instructor).create({
    name: "Protasio",
    exams: [],
  } as CreateInstructor);
  await getRepository(Instructor).save(firstInstructor);

  const secondInstructor = getRepository(Instructor).create({
    name: "Sanglard",
    exams: [],
  } as CreateInstructor);
  await getRepository(Instructor).save(secondInstructor);

  const thirdInstructor = getRepository(Instructor).create({
    name: "Luiz Felipe",
    exams: [],
  } as CreateInstructor);
  await getRepository(Instructor).save(thirdInstructor);
//////////////////////////////////////////////////////
  const firstPeriod = getRepository(Period).create({
    name: "1o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(firstPeriod);

  const secondPeriod = getRepository(Period).create({
    name: "2o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(secondPeriod);

  const thirdPeriod = getRepository(Period).create({
    name: "3o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(thirdPeriod);

  const fourthPeriod = getRepository(Period).create({
    name: "4o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(fourthPeriod);

  const fifthPeriod = getRepository(Period).create({
    name: "5o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(fifthPeriod);

  const sixthPeriod = getRepository(Period).create({
    name: "6o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(sixthPeriod);

  const seventhPeriod = getRepository(Period).create({
    name: "7o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(seventhPeriod);

  const eigthPeriod = getRepository(Period).create({
    name: "8o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(eigthPeriod);

  const ninethPeriod = getRepository(Period).create({
    name: "9o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(ninethPeriod);

  const tenthPeriod = getRepository(Period).create({
    name: "10o",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(tenthPeriod);

  const optionalPeriod = getRepository(Period).create({
    name: "otional",
    courses: [],
  } as CreatePeriod);
  await getRepository(Period).save(optionalPeriod);
//////////////////////////////////////////////////////
    const introCourse = getRepository(Course).create({
    name: "Introducao a Engenharia Naval",
    period: firstPeriod,
    degree: newDegree,
    instructors: [thirdInstructor],
    exams: [],
  } as CreateCourse);
  await getRepository(Course).save(introCourse);

  const compCourse = getRepository(Course).create({
    name: "Computacao 1",
    period: firstPeriod,
    degree: newDegree,
    instructors: [firstInstructor, secondInstructor],
    exams: [],
  } as CreateCourse);
  await getRepository(Course).save(compCourse);
//////////////////////////////////////////////////////
    const firstExam = getRepository(Exam).create({
    name: "2015.1",
    fileLink: "https://www.youtube.com/watch?v=P8Rw77yX4GA",
    category: p1Category,
    instructor: firstInstructor,
    course: compCourse,
  } as CreateExam);
  await getRepository(Exam).save(firstExam);

  const secondExam = getRepository(Exam).create({
    name: "2016.1",
    fileLink: "https://www.youtube.com/watch?v=3IvHXD7UoVI",
    category: p1Category,
    instructor: secondInstructor,
    course: compCourse,
  } as CreateExam);
  await getRepository(Exam).save(secondExam);

  const thirdExam = getRepository(Exam).create({
    name: "2019.2",
    fileLink: "https://www.youtube.com/watch?v=3IvHXD7UoVI",
    category: p3Category,
    instructor: thirdInstructor,
    course: introCourse,
  } as CreateExam);
  await getRepository(Exam).save(thirdExam);
//////////////////////////////////////////////////////
}

export async function getSalt(entitiy: any) {
  const response: any[] = await getRepository(entitiy).find({
    select: ["id"],
    order: { id: "DESC" },
    take: 1,
  });
  const salt: { pid: number } = { pid: 1 };
  const id = response[0]?.id;
  if (id) {
    salt.pid = id;
  }
  return JSON.stringify(salt);
}
