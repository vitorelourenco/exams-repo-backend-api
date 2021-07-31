import { getRepository } from "typeorm";
import Degree from "../entities/Degree";

export async function getWith(degreeId: number) {
  const degree = await getRepository(Degree).findOne({
    where: { id: degreeId },
    relations: ["courses", "courses.instructors", "courses.instructors.exams"],
  });
  const instructors = degree.courses.reduce((acc, course) => {
    acc.push(...course.instructors);
    return acc;
  } ,[])
  return instructors;
}
