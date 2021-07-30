import Category from "../entities/Category";
import Course from "../entities/Course";
import Degree from "../entities/Degree";
import Instructor from "../entities/Instructor";

export default interface CreateExam{
  name:string;
  fileLink:string;
  category:Category;
  instructor:Instructor;
  course:Course;
  degree:Degree;
}

export interface ReceivedExam{
  name:string;
  fileLink:string;
  categoryId:number;
  courseId:number;
  instructorId:number;
  degreeId:number;
}
