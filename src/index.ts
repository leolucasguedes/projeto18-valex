import express, { Request, Response, json } from "express";
import cors from "cors";
import "express-async-errors";
import helmet from "helmet";
import "./config/setup.js"

import AppLog from './events/AppLog.js';
import router from "./routers/index.js";
import ExceptionHandler from './events/AppError.js';

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());
app.use(router);
app.use(ExceptionHandler);


app.use(router);

const PORT = +process.env.PORT || 5000;

app.get('/', async (_req: Request, res: Response) => res.send('Online'));
app.listen(PORT, () => AppLog('Server', `Server is running on port ${PORT}`));