import { Request, Response } from "express";
import * as degreeServices from "../services/degreeServices";
import { newDegreeSchema } from "../schemas/degrees";
import NewDegree from "../protocols/CreateDegree";
import { QueryFailedError } from "typeorm";
import { ValidationError } from "joi";

export async function getAll(req: Request, res: Response) {
  try {
    const degrees = await degreeServices.getAll();
    res.send(degrees);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

export async function getDriveInfo(req: Request, res:Response){
  try {
    const degreeId = parseInt(req.params.degreeId);
    const drive = await degreeServices.getDriveInfo(degreeId);
    res.send(drive);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { error:validationError } = newDegreeSchema.validate(req.body);
    if (validationError) throw validationError;

    const { name } = req.body as NewDegree;
    const result = await degreeServices.create({ name , courses:[]});

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
