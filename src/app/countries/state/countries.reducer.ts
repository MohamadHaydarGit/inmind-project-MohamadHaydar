import { createReducer, on } from '@ngrx/store';
import {
  loadCountries, loadCountriesSuccess, loadFromStore
} from './countries.actions';
import { Country } from '../../models/country';
import {state} from "@angular/animations";
import {map} from "rxjs/operators";

// @ts-ignore
export const initialState:Country[] =JSON.parse(localStorage.getItem("countries"));


export const countryReducer = createReducer(
  initialState,

  on(loadCountries, (state) => {
    return state
  }),
  on(loadFromStore, (state) => {

      return state;


  }),
  // Handle successfully loaded todos
  on(loadCountriesSuccess, (state, { countries }) => {

   return [...state,...countries]
} )

);
export function reducer(state: Country[]) {

}


