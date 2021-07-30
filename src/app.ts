import "reflect-metadata";

import express from "express";
import cors from "cors";

import connectDatabase from "./database";
import degreesRouter from './routers/degreesRouter';

export async function init(){
  await connectDatabase();
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/degrees", degreesRouter);


export default app;
