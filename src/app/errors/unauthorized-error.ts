import { AppError } from "./app-error";



export class UnauthorizedError extends AppError {
    static handle(): string {
        //logout user here
        // redirect to the login route
        // or show a modal
        return 'Unauthorized.';
    }
}