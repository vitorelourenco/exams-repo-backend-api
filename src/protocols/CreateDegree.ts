import Course from '../entities/Course';

interface CreateDegree{
  name: string;
  courses: Course[];
}

export default CreateDegree;
