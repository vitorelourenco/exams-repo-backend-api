import {Request, Response} from 'express';
import * as degreeServices from '../services/degreeServices';

export async function getAll(req:Request, res:Response){
  try {
    const degrees = await degreeServices.getAll();
    res.send(degrees);
  } catch (err) {
    res.sendStatus(500);
  }
}
