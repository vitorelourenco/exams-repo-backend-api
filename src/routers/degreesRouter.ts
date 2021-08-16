import { Router } from 'express';
import * as degreeController from '../controllers/degreeControllers';

const degreesRouter = Router();

degreesRouter.get('/', degreeController.getAll);
degreesRouter.get('/drive/:degreeId', degreeController.getDriveInfo);

degreesRouter.post('/', degreeController.create);

export default degreesRouter;
