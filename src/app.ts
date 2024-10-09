import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/routes";
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Project is running");
});

export default app;
