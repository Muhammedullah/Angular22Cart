import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService);
	const token = authService.refreshToken();
	if(token) req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
	return next(req);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*


import { inject, signal } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError, filter, take, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Module-level signals replacing old let/BehaviorSubject semantics
const isRefreshing = signal(false);
const refreshTokenSubject = new Subject<string | null>();

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.currentUserToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(req: any, next: any, authService: AuthService) {
  // Read signal value using function invocation
  if (!isRefreshing()) {
    isRefreshing.set(true);
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing.set(false);
        refreshTokenSubject.next(response.accessToken);
        return next(req.clone({
          setHeaders: { Authorization: `Bearer ${response.accessToken}` }
        }));
      }),
      catchError((err) => {
        isRefreshing.set(false);
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next(req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })))
    );
  }
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpEvent, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Semaphores to lock multiple requests during a token refresh cycle
let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const authService = inject(AuthService);
	const token = authService.currentUserToken();

	// Clone request to add access token header if available
	let authReq = req;
	if(token) authReq = req.clone({setHeaders: { Authorization: `Bearer ${token}` }});

	return next(authReq).pipe(catchError(error => {
		if(error instanceof HttpErrorResponse && error.status === 401) return handle401Error(authReq, next, authService);
		return throwError(() => error);
	}));
};

function handle401Error(req: any, next: any, authService: AuthService){
	if(!isRefreshing){
		isRefreshing = true;
		refreshTokenSubject.next(null);

		return authService.refreshToken().pipe(
			switchMap(response => {
				isRefreshing = false;
				refreshTokenSubject.next(response.accessToken);
				return next(req.clone({setHeaders: { Authorization: `Bearer ${response.accessToken}` }}));
			}),
			catchError(err => {
				isRefreshing = false;
				authService.logout();
				return throwError(() => err);
			})
		);
	}
	else {		// If refresh is already in progress, wait for the new token to arrive
		return refreshTokenSubject.pipe(
			filter(token => token !== null),
			take(1),
			switchMap(token => next(req.clone({setHeaders: { Authorization: `Bearer ${token}` }})))
		);
	}
}*/