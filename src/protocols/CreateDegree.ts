import Course from "../entities/Course";

export default interface CreateDegree{
  name: string;
  courses: Course[];
}
