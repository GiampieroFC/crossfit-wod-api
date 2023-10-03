import dotenv from "dotenv";

import Server from "./models/server.model";

dotenv.config();

const app = new Server();



app.run();