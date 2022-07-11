import { Request, Response, NextFunction } from 'express';

import AppError from '../config/error.js';
import AppLog from '../events/AppLog.js';

function processHeader(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header;

    if (!apiKey) {
      throw new AppError(
        'Missing headers',
        400,
        'Missing headers',
        'Ensure to provide the necessary headers',
      );
    }

    AppLog('Middleware', `Header processed`);
    res.locals.header = apiKey;
    return next();
  };

export default processHeader;