import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountriesComponent} from './components/countries/countries.component';
import {CountryDetailComponent} from "./components/country-detail/country-detail.component";
import {CountryDetailsResolverService} from "../resolvers/countrie-details-resolver/country-details-resolver.service";
import {CountriesResolverService} from "../resolvers/countries-resolver/countries-resolver.service";
import {MainGuard} from "./guards/main.guard";

const routes: Routes = [
  {
    path: 'list',
    component: CountriesComponent,
    resolve: {countries: CountriesResolverService},
    canActivate: [MainGuard]
  },
  {path: 'details/:code', component: CountryDetailComponent, resolve: {country: CountryDetailsResolverService}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {
}
