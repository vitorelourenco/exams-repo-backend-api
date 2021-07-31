import { Router } from "express";
import * as examController from "../controllers/examControllers";

const examsRouter = Router();

examsRouter.post("/", examController.create);
examsRouter.get("/instructor/:instructorId", examController.getWithInstructor);

export default examsRouter;
