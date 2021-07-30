import Category from "../entities/Category";
import Course from "../entities/Course";
import Instructor from "../entities/Instructor";

export default interface CreateExam{
  name:string;
  fileLink:string;
  category:Category;
  instructor:Instructor;
  course:Course;
}
