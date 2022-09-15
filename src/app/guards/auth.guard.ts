import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {

      // const token = this.authService.getJwtToken();
      //
      // if(this.authService.tokenExpired(token!)){
      //   return true;
      // };

      this.router.navigate(['/countries']);
    }
    return !this.authService.isLoggedIn();
  }
}
