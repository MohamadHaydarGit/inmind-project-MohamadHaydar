import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth-service/auth.service";
import {NgxPermissionsService} from "ngx-permissions";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private ngxPermissionsService: NgxPermissionsService) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {

      // const token = this.authService.getJwtToken();
      //
      // if(this.authService.tokenExpired(token!)){
      //   return true;
      // };
      const permissions = localStorage.getItem('permissions');
      if(permissions){
        this.ngxPermissionsService.loadPermissions(JSON.parse(permissions));
      }

      this.router.navigate(['/countries/list']);
    }
    return !this.authService.isLoggedIn();
  }
}
