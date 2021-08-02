import { Request, Response } from "express";
import * as examServices from "../services/examServices";
import { newExamSchema } from "../schemas/exams";
import {ReceivedExam} from "../protocols/CreateExam";
import { QueryFailedError } from "typeorm";
import { ValidationError } from "joi";
import * as idSchemas from '../schemas/id';
import { DeepValidationError } from "../utils/errors";

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
    console.debug(err);
    if (err instanceof ValidationError) {
      return res.status(400).send(err.message + " => " + err._original);
    }

    if (err instanceof QueryFailedError) {
      const { code, message, detail } = err.driverError;
      if (code === "23505")
        return res.status(409).send(message + " => " + detail);
      if (code === "23502")
        return res.status(404).send(message + " => " + detail);
    }

    return res.sendStatus(500);
  }
}

export async function getWithInstructorIdByCategory(req:Request, res:Response){
  try {
    const paramInstructorId = req.params.instructorId;
    const {error: joiError} = idSchemas.id.validate(paramInstructorId)
    if (joiError) throw joiError;
    const instructorId = parseInt(paramInstructorId.toString());
    const exams = await examServices.getWithInstructorIdByCategory(instructorId);
    res.send(exams);
  } catch (err) {
    console.error(err.message);

    if (err instanceof ValidationError) {
      return res.status(400).send(err.message + " => " + err._original);
    }

    if (err instanceof DeepValidationError) {
      return res.status(err.code).send(err.message + " => " + err.detail);
    }

    res.sendStatus(500);
  }
}

export async function getWithCourseIdByCategory(req:Request, res:Response){
  try {
    const paramCourseId = req.params.courseId;
    const {error: joiError} = idSchemas.id.validate(paramCourseId)
    if (joiError) throw joiError;
    const courseId = parseInt(paramCourseId.toString());
    const exams = await examServices.getWithCourseIdByCategory(courseId);
    res.send(exams);
  } catch (err) {
    console.error(err.message);

    if (err instanceof ValidationError) {
      return res.status(400).send(err.message + " => " + err._original);
    }
    
    if (err instanceof DeepValidationError) {
      return res.status(err.code).send(err.message + " => " + err.detail);
    }

    res.sendStatus(500);
  }
}
