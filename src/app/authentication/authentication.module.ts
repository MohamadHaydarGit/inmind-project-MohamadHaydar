import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./token.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {NgxPermissionsModule} from "ngx-permissions";
import {TranslocoRootModule} from "../transloco-root.module";
import {NavbarModule} from "../navbar/navbar.module";

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    NgxPermissionsModule.forChild(),
    TranslocoRootModule,
    NavbarModule,
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
