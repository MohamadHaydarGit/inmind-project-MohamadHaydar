import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../authentication/services/auth-service/auth.service";
import {NgxPermissionsService} from "ngx-permissions";

@Injectable({
  providedIn: 'root'
})
export class DetailsGuard implements CanActivate {
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
