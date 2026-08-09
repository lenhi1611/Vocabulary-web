export class AppError extends Error {
    constructor(public message: string, public statusCode: number, public code: string) {
        super(message);
        this.name = "AppError";
    }

}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request", code: string = "BAD_REQUEST") {
        super(message, 400, code);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", code: string = "UNAUTHORIZED") {
        super(message, 401, code);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden", code: string = "FORBIDDEN") {
        super(message, 403, code);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Not Found", code: string = "NOT_FOUND") {
        super(message, 404, code);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict", code: string = "CONFLICT") {
        super(message, 409, code);
    }
}

export class InternalServerError extends AppError {
    constructor(message = "Internal Server Error", code: string = "INTERNAL_SERVER_ERROR") {
        super(message, 500, code);
    }
}


