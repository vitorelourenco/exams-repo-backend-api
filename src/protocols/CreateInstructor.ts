import Exam from "../entities/Exam";

export default interface CreateInstructor{
  name: string;
  exams: Exam[];
}
