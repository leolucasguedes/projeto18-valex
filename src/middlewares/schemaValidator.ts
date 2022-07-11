import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

import AppError from '../config/error.js';
import AppLog from '../events/AppLog.js';

export default function validSchema(schema: Schema, endpoint: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    AppLog('Server', endpoint);
    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      const { error } = result;
      throw new AppError(
        'Invalid Input',
        422,
        'Invalid Input',
        error.details.map((detail) => detail.message).join(', '),
      );
    }

    AppLog('Middleware', `Schema for endpoint ${endpoint} validated`);
    res.locals.body = req.body;
    return next();
  };
}