import Course from '../entities/Course';

interface CreatePeriod{
  name:string;
  courses: Course[];
}

export default CreatePeriod;
