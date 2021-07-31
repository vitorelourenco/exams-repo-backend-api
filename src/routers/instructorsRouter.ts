import { Router } from "express";
import * as instructorControllers from "../controllers/instructorControllers";

const instructorsRouter = Router();

instructorsRouter.get("/:courseId", instructorControllers.getWith);

export default instructorsRouter;
