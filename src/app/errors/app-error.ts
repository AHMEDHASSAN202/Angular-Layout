import { HttpErrorResponse } from '@angular/common/http';




export class AppError {
    constructor(public originalError?: HttpErrorResponse) {
        console.log(originalError);
    }

    static handle(): string {
        return 'Something bad happened; please try again later.';
    }
}