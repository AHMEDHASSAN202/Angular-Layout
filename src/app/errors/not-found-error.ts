import { AppError } from "./app-error";



export class NotFoundError extends AppError {

    static handle(): string {
        return 'Not Found';
    }
}