import { getRepository } from "typeorm";
import Category from "../entities/Category";
import Course from "../entities/Course";
import Degree from "../entities/Degree";
import Exam from "../entities/Exam";
import Instructor from "../entities/Instructor";
import CreateExam, { ReceivedExam } from "../protocols/CreateExam";

export async function create(receivedExam: ReceivedExam) {
  const degree = await getRepository(Degree).findOne({where:{id:receivedExam.degreeId}})
  const course = await getRepository(Course).findOne({where:{id:receivedExam.courseId}})
  const instructor = await getRepository(Instructor).findOne({where:{id:receivedExam.instructorId}})
  const category = await getRepository(Category).findOne({where:{id:receivedExam.categoryId}});
  const name = receivedExam.name;
  const fileLink = receivedExam.fileLink;
  const exam:CreateExam = {degree, course, instructor, category, name, fileLink}; 
  const newExam = getRepository(Exam).create(exam);
  await getRepository(Exam).save(newExam);
  return newExam;
}
