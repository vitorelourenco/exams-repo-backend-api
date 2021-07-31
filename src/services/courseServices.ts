import { getRepository } from "typeorm";
import Period from "../entities/Period";

export async function getWithDegreeIdByPeriod(degreeId: number) {
  const coursesByPeriod = await getRepository(Period)
  .createQueryBuilder("period")
  .leftJoinAndSelect("period.courses", "course")
  .leftJoinAndSelect("course.degree", "degree")
  .where("course.degree = :degreeId",{degreeId:degreeId})
  .getMany();
  
  return coursesByPeriod;
}
