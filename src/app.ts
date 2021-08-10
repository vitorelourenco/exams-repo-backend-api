import "reflect-metadata";

import express from "express";
import cors from "cors";

import connectDatabase from "./database";
import degreesRouter from './routers/degreesRouter';
import categoryRouter from "./routers/categoriesRouter";
import examsRouter from "./routers/examsRouter";
import signRouter from "./routers/signRouter";
import instructorsRouter from './routers/instructorsRouter';
import coursesRouter from "./routers/coursesRouter";

export async function init(){
  console.log(`App is running on env: ${process.env.NODE_ENV}`);
  console.log(`Reading environment variables from: ${process.env.DOTENV_CONFIG_PATH}`);
  console.log(`Interacting with database of URL: ${process.env.DATABASE_URL}`);
  await connectDatabase();
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/degrees", degreesRouter);
app.use("/categories", categoryRouter);
app.use("/exams", examsRouter)
app.use("/sign-s3", signRouter)
app.use("/instructors", instructorsRouter);
app.use("/courses", coursesRouter)

export default app;
