import { Request, Response } from "express";
import * as instructorServices from "../services/instructorServices";
import { ValidationError } from "joi";
import * as instructorsSchemas from '../schemas/instructors';

export async function getWith(req: Request, res: Response) {
  try {
    
    const paramCourseId = req.params.courseId;
    const {error: joiError} = instructorsSchemas.queryCourseId.validate(paramCourseId)
    if (joiError) throw joiError;
    const courseId = parseInt(paramCourseId.toString());
    const instructors = await instructorServices.getWith(courseId);
    res.send(instructors);
  } catch (err) {
    console.error(err.message);

    if (err instanceof ValidationError) {
      return res.status(400).send(err.message + " => " + err._original);
    }
    
    res.sendStatus(500);
  }
}
