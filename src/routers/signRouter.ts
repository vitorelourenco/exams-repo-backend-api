import { Router } from "express";
import * as signControllers from "../controllers/signControllers";

const signRouter = Router();

signRouter.get("/", signControllers.signS3);

export default signRouter;
