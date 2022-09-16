import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginFormComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationFormComponent},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
