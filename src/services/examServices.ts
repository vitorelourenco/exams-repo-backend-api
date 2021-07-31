import { getRepository } from "typeorm";
import Category from "../entities/Category";
import Course from "../entities/Course";
import Degree from "../entities/Degree";
import Exam from "../entities/Exam";
import Instructor from "../entities/Instructor";
import Period from "../entities/Period";
import CreateExam, { ReceivedExam } from "../protocols/CreateExam";

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
  const name = receivedExam.name;
  const fileLink = receivedExam.fileLink;
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

export async function getWithInstructorId(instructorId: number) {
  const exams = await getRepository(Exam).find({
    where: { instructor: instructorId },
    relations: ["instructor", "course", "category"],
  });
  return exams;
}

export async function getWithInstructorIdByPeriod(instructorId: number) {
  const exams = await getRepository(Period)
    .createQueryBuilder("period")
    .leftJoinAndSelect("period.courses", "course")
    .leftJoinAndSelect("course.degree", "degree")
    .leftJoinAndSelect("course.exams", "exam")
    .leftJoinAndSelect("exam.instructor", "instructor")
    .where("exam.instructor = :instructorId",{instructorId:instructorId})
    .getMany();

  return exams;
}

export async function getWithInstructorIdByCategory(instructorId: number) {
  const categories = await getRepository(Category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.exams", "exam")
    .leftJoinAndSelect("exam.instructor", "instructor")
    .leftJoinAndSelect("exam.course", "course")
    .leftJoinAndSelect("course.degree", "degree")
    .where("exam.instructor = :instructorId",{instructorId:instructorId})
    .getMany();

  return categories;
}

export async function getWithCourseIdByCategory(courseId: number) {
  const categories = await getRepository(Category)
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.exams", "exam")
    .leftJoinAndSelect("exam.instructor", "instructor")
    .leftJoinAndSelect("exam.course", "course")
    .leftJoinAndSelect("course.degree", "degree")
    .where("exam.course = :courseId",{courseId:courseId})
    .getMany();

  return categories;
}
