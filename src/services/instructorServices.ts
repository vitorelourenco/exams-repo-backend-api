import { getRepository } from "typeorm";
import Degree from "../entities/Degree";
import { DeepValidationError } from "../utils/errors";

export async function getWith(degreeId: number) {
  const degree = await getRepository(Degree).findOne({
    where: { id: degreeId },
    relations: ["courses", "courses.instructors", "courses.instructors.exams"],
  });

  if (!degree) throw new DeepValidationError(404,`Invalid Request`,`degreeId=${degreeId} not found`)
  
  const instructors = degree.courses.reduce((acc, course) => {
    acc.push(...course.instructors);
    return acc;
  } ,[])
  return instructors;
}
