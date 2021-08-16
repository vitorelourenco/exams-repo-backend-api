import Degree from '../entities/Degree';
import Exam from '../entities/Exam';
import Instructor from '../entities/Instructor';
import Period from '../entities/Period';

interface CreateCourse{
  name:string;
  period:Period;
  degree:Degree;
  instructors:Instructor[];
  exams: Exam[];
}

export default CreateCourse;
