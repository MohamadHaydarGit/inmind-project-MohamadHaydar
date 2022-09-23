import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./authentication/token.interceptor";
import {NgxPermissionsModule} from "ngx-permissions";
import { StoreModule } from '@ngrx/store';
import {countryReducer} from "./countries/state/countries.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CountriesEffects} from "./countries/state/countries.effects";
import {Translation, translocoConfig, TranslocoLoader, TRANSLOCO_CONFIG, TRANSLOCO_LOADER} from "@ngneat/transloco";
import {environment} from "../environments/environment";
import {TranslocoRootModule} from "./transloco-root.module";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot({countries:countryReducer}),
    EffectsModule.forRoot([CountriesEffects]),
    TranslocoRootModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
