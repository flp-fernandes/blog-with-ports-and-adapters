import { type AnySchema } from 'joi';
import { curryN, isEmpty } from 'ramda';

import { BadRequestError } from '../../../util/error';

import { type HttpRequest, type HttpResponse, type HttpNext } from '../../../types/interface';
import { Logger } from '../../../util/logger';

const logger = new Logger('Middleware validator');

export const validator = curryN(
  4,
  (schema: AnySchema, req: HttpRequest, res: HttpResponse, next: HttpNext) => {
    if (!isEmpty(req.params)) {
      logger.console().info(`req.params >>> ${JSON.stringify(req.params)}`);
    }
    if (!isEmpty(req.body)) {
      logger.console().info(`req.body >>> ${JSON.stringify(req.body)}`);
    }
    if (!isEmpty(req.query)) {
      logger.console().info(`req.query >>> ${JSON.stringify(req.query)}`);
    }

    const validation = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true
    });

    if (validation.error) {
      logger.console().error('Error on middleware validator');

      return next(new BadRequestError('Invalid request params', validation.error.details));
    }

    Object.assign(req, validation.value);

    next();
  }
);
