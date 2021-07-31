import { Request, Response } from "express";
import * as instructorServices from "../services/instructorServices";
import { ValidationError } from "joi";
import * as idSchemas from '../schemas/id';

export async function getWith(req: Request, res: Response) {
  try {
    
    const paramDegreeId = req.params.degreeId;
    const {error: joiError} = idSchemas.id.validate(paramDegreeId)
    if (joiError) throw joiError;
    const degreeId = parseInt(paramDegreeId.toString());
    const instructors = await instructorServices.getWith(degreeId);
    res.send(instructors);
  } catch (err) {
    console.error(err.message);

    if (err instanceof ValidationError) {
      return res.status(400).send(err.message + " => " + err._original);
    }
    
    res.sendStatus(500);
  }
}
