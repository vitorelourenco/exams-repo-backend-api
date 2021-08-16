import Exam from '../entities/Exam';

interface CreateCategory{
  name: string;
  exams: Exam[];
}

export default CreateCategory;
