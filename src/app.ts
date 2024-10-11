import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/routes";
import globalErrorHandler from "./app/middleware/handleGlobalError";
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api", router);


app.get("/", (req: Request, res: Response) => {
  res.send("Project is running");
});
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler);

export default app;
