import { createReducer, on } from '@ngrx/store';
import {
  loadCountries, loadCountriesSuccess, loadFromStore
} from './countries.actions';
import { Country } from '../../models/country';
import {state} from "@angular/animations";
import {map} from "rxjs/operators";

//define the initial state which is in this case the array of countries that is stored in the local storage

// @ts-ignore
export const initialState:Country[] =localStorage.getItem("countries")? JSON.parse(localStorage.getItem("countries")):[];

//actual reducer, takes in the initial state and based on the type of action we are altering the state
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


