import { Request, Response } from "express";
import * as categoryServices from "../services/categoryServices";

export async function getAll(req: Request, res: Response) {
  try {
    const categories = await categoryServices.getAll();
    res.send(categories);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

