import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {AuthService} from "./services/auth-service/auth.service";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {Login} from "../models/token";
import {Router} from "@angular/router";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.getJwtToken()) {
      // @ts-ignore
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError((error:HttpErrorResponse) => {
      if (error.status === 401 || error.status === 0) {
        console.log(error.status);
        return this.handle401Error(request, next);
      } else {
        console.log(error.status);
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }WS
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      console.log("refreshing");
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        catchError((error:HttpErrorResponse) => {
          this.authService.doLogoutUser();
          this.router.navigate(['/authentication/login']);
          return throwError(error);
        } ),
        switchMap((token:Login) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.AccessToken);
          this.authService.storeJwtToken(token.AccessToken);
          return next.handle(this.addToken(request, token.AccessToken));
        }),

      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

}
