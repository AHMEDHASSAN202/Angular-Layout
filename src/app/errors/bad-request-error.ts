import { AppError } from "./app-error";



export class BadRequestError extends AppError {
    static handle(): string {
        return 'Bad Request';
    }
}