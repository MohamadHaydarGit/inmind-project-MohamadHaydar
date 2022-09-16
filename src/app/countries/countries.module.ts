import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';

import {CountryDetailComponent} from "./components/country-detail/country-detail.component";
import {CountriesComponent} from "./components/countries/countries.component";
import {SearchComponent} from "./components/search/search.component";
import {NavbarModule} from "../navbar/navbar.module";
import {FormsModule} from "@angular/forms";
import {KeysPipe} from "../pipes/keys.pipe";


@NgModule({
  declarations: [
    SearchComponent,
    CountriesComponent,
    CountryDetailComponent,
    KeysPipe,
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    NavbarModule,
    FormsModule
  ]
})
export class CountriesModule { }
