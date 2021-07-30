import { Request, Response } from "express";
import * as examServices from "../services/examServices";
import { newExamSchema } from "../schemas/exams";
import NewExam,{ReceivedExam} from "../protocols/CreateExam";
import { QueryFailedError } from "typeorm";
import { ValidationError } from "joi";

export async function create(req: Request, res: Response) {
  try {
    const { error:validationError } = newExamSchema.validate(req.body);
    if (validationError) throw validationError;

    const { name, fileLink, instructorId, courseId, categoryId, degreeId } = req.body as ReceivedExam;
    const creationParams = { name, fileLink, instructorId, courseId, categoryId, degreeId };
    const result = await examServices.create(creationParams);

    res.status(201).send(result);
  } catch (err) {

    console.error(err.message);

    if (err instanceof ValidationError) {
      return res.status(400).send(err.message + " => " + err._original);
    }

    if (err instanceof QueryFailedError) {
      const { code, message, detail } = err.driverError;
      if (code === "23505")
        return res.status(409).send(message + " => " + detail);
    }

    return res.sendStatus(500);
  }
}