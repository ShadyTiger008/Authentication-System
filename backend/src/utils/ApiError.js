export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    //If a stack tray is provided, use it; otherwise use the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      // Use Error.captureStackTrace to capture the stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
