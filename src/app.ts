import "reflect-metadata";

import connectDatabase from "./database";
import degreesRouter from './routers/degreesRouter';
import express from "express";
import cors from "cors";

export async function init(){
  await connectDatabase();
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/degrees", degreesRouter);

export default app;
