import {Component, OnInit} from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Register for stuff';
  constructor(private ngxPermissionsService: NgxPermissionsService) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('permissions')){
      // @ts-ignore
      this.ngxPermissionsService.loadPermissions(JSON.parse(localStorage.getItem('permissions')));
    }
  }

}
