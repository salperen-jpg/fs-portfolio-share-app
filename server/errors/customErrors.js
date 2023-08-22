import { StatusCodes } from "http-status-codes";

class BadRequest extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFound extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class Unauthenticated extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

class Unauthorized extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export { BadRequest, NotFound, Unauthenticated, Unauthorized };
