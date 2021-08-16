import { Router } from 'express';
import * as examController from '../controllers/examControllers';

const examsRouter = Router();

examsRouter.post('/', examController.create);

examsRouter.get('/instructor/:instructorId/byCategory', examController.getWithInstructorIdByCategory);

examsRouter.get('/course/:courseId/byCategory', examController.getWithCourseIdByCategory);

export default examsRouter;
