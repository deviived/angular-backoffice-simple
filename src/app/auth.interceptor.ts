import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    // Inject the Router inside the interceptor
    const router = inject(Router);
    const token = localStorage.getItem('jwtToken');

    let clonedRequest = req;
    if (token) {
        clonedRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
        });
    }

    // Handle the request and catch any errors
    return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log({error})
            // If 401 error, redirect to login
            if (error.status === 401) {
                console.warn('Unauthorized! Redirecting to login...');
                router.navigate(['/login']);
            }

            // Return the error
            return throwError(error);
        })
    );
};