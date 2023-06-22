import express, { Express } from "express";
import { employeeRouter } from "./routes";
import cors from "cors";

export class ExpressServer {
  private expressApp: Express = express();

  constructor(private appPort: number) {}

  server() {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.use("/", [employeeRouter]);

    this.expressApp.listen(this.appPort, () =>
      console.log(`The app is running at: http://localhost:${this.appPort}`)
    );
  }
}
