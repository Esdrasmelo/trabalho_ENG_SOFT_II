import dotenv from "dotenv";

dotenv.config()

import { ExpressServer } from "./infrastructure/adapters/api/express/server";

const appPort = Number(process.env.APP_PORT);

const appServer = new ExpressServer(appPort);

appServer.server();
