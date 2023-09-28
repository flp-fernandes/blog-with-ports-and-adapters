import R from 'ramda';

import { type HttpNext, type HttpRequest, type HttpResponse } from '../../../types/interface';
import { DuplicateUserEmail, InternalServerError, NotFoundError, TooManyRequestsError, UnauthorizedError } from '../../../util/error';
import { Logger } from '../../../util/logger';

const logger = new Logger('Error Handler');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNotFoundError = (err: any): boolean => {
  return (
    err instanceof NotFoundError
  );
};

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: HttpRequest,
  res: HttpResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: HttpNext
) => {
  let status = 500;
  let throwErr = err;

  if (isNotFoundError(err)) {
    status = 404;
    throwErr = new NotFoundError(throwErr.message, throwErr.details);
  }

  if (err instanceof UnauthorizedError) {
    status = 401;
  }

  if (err instanceof TooManyRequestsError) {
    status = 429;
    throwErr = err;
  }

  if (err instanceof DuplicateUserEmail) {
    status = 409;
    throwErr = err;
  }

  if (status !== 500) {
    logger.console().warn(err);
  } else {
    throwErr = new InternalServerError(err.message, err.details);
    logger.console().error(err);
  }

  return res.status(status).send(
    R.reject(R.isNil, {
      code: throwErr.code,
      message: throwErr.message,
      details: throwErr.details
    })
  );
};
