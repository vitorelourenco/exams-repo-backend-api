import Exam from '../entities/Exam';

interface CreateInstructor{
  name: string;
  exams: Exam[];
}

export default CreateInstructor;
