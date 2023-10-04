class CustomError extends Error {
  private readonly code: string;
  private readonly details: CustomError[] | null;

  constructor (
    code: string,
    message: string | null = null,
    details: CustomError[] | null = null
  ) {
    super(message ?? code);
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidProperties extends CustomError {
  constructor (message: string, details: unknown) {
    super('INVALID_PROPERTIES', message, details as CustomError[]);
  }
}

export class NotFoundError extends CustomError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor (message: string, details: null | any[] = null) {
    super('NOT_FOUND', message, details);
  }
}

export class UnauthorizedError extends CustomError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor (message: string, details: null | any[] = null) {
    super('UNAUTHORIZED_ERROR', message, details);
  }
}

export class TooManyRequestsError extends CustomError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor (message: string, details: null | any[] = null) {
    super('TOO_MANY_REQUESTS_ERROR', message, details);
  }
}

export class InternalServerError extends CustomError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor (message: string, details: null | any[] = null) {
    super('INTERNAL_SERVER_ERROR', message, details);
  }
}

export class BadRequestError extends CustomError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor (message: string, details: null | any[] = null) {
    super('BAD_REQUEST_ERROR', message, details);
  }
}

export class FailedToSaveUser extends CustomError {
  constructor (msg: string) {
    super('FAILED_TO_SAVE_USER', msg);
  }
}

export class DuplicateUserEmail extends CustomError {
  constructor (msg: string) {
    super('FAILED_TO_SAVE_USER_DUPLICATE_EMAIL', msg);
  }
}

export class FailedToFindUser extends CustomError {
  constructor (msg: string) {
    super('FAILED_TO_FIND_USER', msg);
  }
}

export class InvalidUserToFind extends CustomError {
  constructor(msg: string, details?: unknown) {
    super('INVALID_USER_TO_FIND', msg, details as CustomError[]);
  }
}

export class FailedToSavePost extends CustomError {
  constructor(msg: string, details?: unknown) {
    super('FAILED_TO_SAVE_POST', msg, details as CustomError[]);
  }
}