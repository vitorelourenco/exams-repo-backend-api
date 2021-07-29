import { Router } from "express";
import * as degreeController from "../controllers/degreeController";

const degrees = Router();

degrees.get("/", degreeController.getAll);

export default degrees;
