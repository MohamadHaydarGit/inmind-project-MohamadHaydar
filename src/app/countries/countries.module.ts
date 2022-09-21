import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {environment} from '../../environments/environment';
import { CountriesRoutingModule } from './countries-routing.module';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {CountryDetailComponent} from "./components/country-detail/country-detail.component";
import {CountriesComponent} from "./components/countries/countries.component";
import {SearchComponent} from "./components/search/search.component";
import {NavbarModule} from "../navbar/navbar.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeysPipe} from "../pipes/keys.pipe";
import {NgxPermissionsModule} from "ngx-permissions";
import { ImageComponent } from './components/country-detail/image/image.component';
import { ImageListComponent } from './components/country-detail/image-list/image-list.component';
import {ImageService} from "./services/gallery-service/image.service";
import {StoreModule} from "@ngrx/store";
import {countryReducer} from "./state/countries.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CountriesEffects} from "./state/countries.effects";


@NgModule({
  declarations: [
    SearchComponent,
    CountriesComponent,
    CountryDetailComponent,
    KeysPipe,
    ImageComponent,
    ImageListComponent,
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild(),
    // StoreModule.forFeature({name: "countries", reducer: countryReducer},),
    // EffectsModule.forFeature([CountriesEffects]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers:[ImageService],
})
export class CountriesModule { }
