import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';


export class SetHeadersInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const req = request.clone({
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept':  'application/json',
            })
        });
        return next.handle(req);
    }
}