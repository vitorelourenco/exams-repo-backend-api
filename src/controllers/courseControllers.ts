import { Request, Response } from "express";
import * as courseServices from "../services/courseServices";
import { ValidationError } from "joi";
import * as idSchemas from '../schemas/id';
import { DeepValidationError } from "../utils/errors";

export async function getWithDegreeIdByPeriod(req: Request, res: Response) {
  try {
    const paramDegreeId = req.params.degreeId;
    const {error: joiError} = idSchemas.id.validate(paramDegreeId)
    if (joiError) throw joiError;
    const degreeId = parseInt(paramDegreeId.toString());
    
    const instructors = await courseServices.getWithDegreeIdByPeriod(degreeId);
    
    res.send(instructors);
  } catch (err) {
    console.error(err.message);

    if (err instanceof ValidationError) {
      return res.status(400).send(err.message + " => " + err._original);
    }

    if (err instanceof DeepValidationError){
      return res.status(err.code).send(err.message + " => " + err.detail);
    }
    
    res.sendStatus(500);
  }
}
