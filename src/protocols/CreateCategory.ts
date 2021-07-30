import Exam from "../entities/Exam";

export default interface CreateCategory{
  name: string;
  exams: Exam[];
}
