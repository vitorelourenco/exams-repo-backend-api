import Course from "../entities/Course";

export default interface CreatePeriod{
  name:string;
  courses: Course[];
}
