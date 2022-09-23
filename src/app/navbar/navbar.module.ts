import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';
import {NavigationComponent} from "./components/navigation/navigation.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../authentication/token.interceptor";
import {TranslocoRootModule} from "../transloco-root.module";


@NgModule({
  declarations: [
    NavbarComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    TranslocoRootModule
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class NavbarModule { }
