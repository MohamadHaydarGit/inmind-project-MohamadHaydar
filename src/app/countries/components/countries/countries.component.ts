import {Component, OnInit} from '@angular/core';
import {Country} from "../../../models/country";
import {ActivatedRoute, Router} from "@angular/router";
import {loadCountries, loadFromStore} from "../../state/countries.actions";

import {createSelector, Store} from "@ngrx/store";
import {Observable} from "rxjs";


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  public countries: Country[] = [];
  public errorMsg: any;
  public selectedId: number = 0;

  //We're accessing the store from ngrx , and then selecting countries which is defined as a  property from app.module.ts
  // in StoreModule.forRoot({}). This calls the countries reducer and returns the countries state.
  // @ts-ignore
  public countries$: Observable<Country[]> = this.store.select('countries');

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {

  }




  ngOnInit(): void {
    //after the resolver returns something (although here nothing is returned)
    this.route.data.subscribe((response: any) => {
        //triggering loadCountries action
        this.store.dispatch(loadCountries());

        console.log('PRODUCT FETCHED');
      },
      error => this.errorMsg = error);
  }

  searchText: string = '';

  //this function gets called every time (searchTextChanged) event is triggered so basically on each change of text
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  selectedRegion: string = '';

  onSelectedRegion(region: string) {
    this.selectedRegion = region;
  }


  onSelect(country: Country) {
    this.router.navigate(['/countries/details', country.cca3],);
  }


}
