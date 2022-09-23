import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../authentication/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  lang:string='';
  constructor(private authService:AuthService,private router: Router,  private translateService:TranslocoService) { }

  ngOnInit(): void {
    if(localStorage.getItem('lang')){
      // @ts-ignore
      this.lang=localStorage.getItem('lang');
      this.translateService.setActiveLang(this.lang);
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  updateLang(value:string){
    this.lang=value;
    this.translateService.setActiveLang(this.lang);
    localStorage.setItem('lang',this.lang);
  }


  logout() {
    this.authService.logout()
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/authentication/login']);
        }
        else{
          console.log("failure");
        }
      });
  }

}
