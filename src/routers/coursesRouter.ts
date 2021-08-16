import { Router } from 'express';
import * as courseControllers from '../controllers/courseControllers';

const courseRouter = Router();

courseRouter.get('/:degreeId/byPeriod', courseControllers.getWithDegreeIdByPeriod);

export default courseRouter;
