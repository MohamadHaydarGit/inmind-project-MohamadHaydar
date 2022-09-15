import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {CountriesComponent} from "./components/countries/countries.component";
import {CountriesResolverService} from "./resolvers/countries-resolver/countries-resolver.service";
import {CountryDetailComponent} from "./components/country-detail/country-detail.component";
import {CountryDetailsResolverService} from "./resolvers/countrie-details-resolver/country-details-resolver.service";
import {AuthGuard} from "./guards/auth.guard";
import {MainGuard} from "./guards/main.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: "full"},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'login', component: LoginFormComponent, canActivate:[AuthGuard]},
  {path: 'countries', component: CountriesComponent, resolve:{countries:CountriesResolverService}, canActivate:[MainGuard]},
  {path: 'countries/:code', component: CountryDetailComponent, resolve:{country: CountryDetailsResolverService}},


  // {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
