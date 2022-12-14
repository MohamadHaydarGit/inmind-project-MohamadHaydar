import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../../authentication/services/auth-service/auth.service";
import {NgxPermissionsService} from "ngx-permissions";

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private ngxPermissionsService: NgxPermissionsService) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      const permissions = localStorage.getItem('permissions');
      if(permissions){
        this.ngxPermissionsService.loadPermissions(JSON.parse(permissions));
      }
      this.router.navigate(['/authentication/login']);
    }
    return this.authService.isLoggedIn();
  }
}
