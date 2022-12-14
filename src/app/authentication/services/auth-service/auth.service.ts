import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {config, Observable, of, throwError} from "rxjs";
import {catchError, mapTo, tap, timeout} from "rxjs/operators";
import {Login, Tokens} from "../../../models/token";
import {SignUp} from "../../../models/signup";
import jwt_decode from 'jwt-decode';
import {User} from "../../../models/user";
import {NgxPermissionsService} from "ngx-permissions";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: User | undefined;
  private readonly ROOT_URL = 'http://localhost:5005/api/User';

  constructor(private http: HttpClient,private ngxPermissionsService: NgxPermissionsService,private router:Router) {}

  signup(user: SignUp): Observable<boolean> {
    return this.http.post<any>(this.ROOT_URL+"/SignUp()",{
      "Firstname": user.Firstname,
      "Lastname": user.Lastname,
      "Email": user.Email,
      "Password": user.Password,
      "RoleName": user.RoleName
    })
      .pipe(
        tap(response=> {
          if(response.enabled){
            return of(true);
          }else {
            alert("Account creation failed")
            return of(false);
          }
        }),
        catchError((error:HttpErrorResponse) => {
          console.log(error.message);
          return of(false);
        }));
  }

  createAdmin(admin: SignUp): Observable<boolean> {
    return this.http.post<any>(this.ROOT_URL+"/CreateAdminUser()",{
      "Firstname": admin.Firstname,
      "Lastname": admin.Lastname,
      "Email": admin.Email,
      "Password": admin.Password,
      "RoleName": admin.RoleName
    })
      .pipe(
        tap(response=> {
          if(response.enabled){
            return of(true);
          }else {
            alert("Account creation failed")
            return of(false);
          }
        }),
        catchError((error:HttpErrorResponse) => {
          alert(error.message);
          return of(false);
        }));
  }

  login(user: { Username: string, Password: string }): Observable<boolean> {
    return this.http.post<any>(this.ROOT_URL+"/Login()",{
      "Username":user.Username,
      "Password":user.Password
    })
      .pipe(
        tap(tokens=> this.doLoginUser(user.Username, tokens)),
        mapTo(true),
        catchError((error:HttpErrorResponse) => {
          alert(error.message);
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(this.ROOT_URL+'/Logout()', {  //logout returns empty object
      "Token": this.getJwtToken(),
      'RefreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      timeout(3000),
      catchError((error:HttpErrorResponse) => {
        this.doLogoutUser();
        this.router.navigate(['/authentication/login']);
        console.log(error.message);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    console.log('ref');
    return this.http.post<any>(this.ROOT_URL+'/RefreshToken()', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Login) => {
      this.storeJwtToken(tokens.AccessToken);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
   tokenExpired(token: string) {
     const tokenInfo = this.getDecodedAccessToken(token!);
     const expireDate = tokenInfo.exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expireDate;
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.storeTokens(tokens);
    this.setProfile();
  }


   private setProfile(): void{
       // @ts-ignore
     const tokenInfo = this.getDecodedAccessToken(this.getJwtToken());
     console.log( tokenInfo.realm_access.roles);
       if(tokenInfo.realm_access.roles.includes("Admin")){
         this.ngxPermissionsService.addPermission('ADMIN');
         localStorage.setItem("permissions",JSON.stringify(['ADMIN']));
       }
       else{
         this.ngxPermissionsService.addPermission('USER');
         localStorage.setItem("permissions",JSON.stringify(['USER']));
       }


  }

  getProfile(){
   return this.loggedUser;
  }

  private handleError<T>(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

  public doLogoutUser() {
    // @ts-ignore
    this.loggedUser = null;
    this.ngxPermissionsService.flushPermissions();

    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public storeJwtToken(jwt: string) {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.setItem(this.JWT_TOKEN, tokens.Login.AccessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.Login.RefreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem('permissions');
  }

}
