import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotFoundError } from './not-found-error';
import { BadRequestError } from './bad-request-error';
import { UnauthorizedError } from './unauthorized-error';




export class AppError {
    
    constructor(public originalError?: HttpErrorResponse) {
        console.log(originalError);
    }

    static handle(): string {
        return 'Something bad happened; please try again later.';
    }
}
