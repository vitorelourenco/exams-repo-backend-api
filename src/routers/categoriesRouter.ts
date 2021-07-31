import { Router } from "express";
import * as categoryController from "../controllers/categoryControllers";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAll);

export default categoryRouter;
