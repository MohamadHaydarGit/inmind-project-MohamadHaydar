import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../../authentication/services/auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/authentication/login']);
    }
    return this.authService.isLoggedIn();
  }
}
