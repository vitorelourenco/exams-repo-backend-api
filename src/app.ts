import "reflect-metadata";

import express from "express";
import cors from "cors";

import connectDatabase from "./database";
import degreesRouter from './routers/degreesRouter';
import categoryRouter from "./routers/categoryRouter";
import examsRouter from "./routers/examsRouter";

export async function init(){
  await connectDatabase();
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/degrees", degreesRouter);
app.use("/categories", categoryRouter);
app.use("/exams", examsRouter)

export default app;
