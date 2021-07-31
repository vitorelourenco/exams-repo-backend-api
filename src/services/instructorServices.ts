import { getRepository } from "typeorm";
import Course from "../entities/Course";

export async function getWith(courseId:number) {
  const courses = await getRepository(Course).findOne({where:{id:courseId}, relations:["instructors","instructors.exams"]});
  return courses.instructors;
}
