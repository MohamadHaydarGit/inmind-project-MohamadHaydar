import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCountries,
  loadCountriesSuccess, loadFromStore, updateCountries,
} from './countries.actions';
import { CountryService } from '../services/coutry-service/country.service';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {from} from "rxjs";

@Injectable()
export class CountriesEffects {
  length = 0;
  constructor(
    private actions$: Actions,
    private countryService: CountryService,
    private store:Store,
  ) {}

  // Run this code when a loadTodos action is dispatched

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCountries),
      // @ts-ignore
      switchMap(()=> {

          if(localStorage.getItem("countries")) {

            // @ts-ignore
            var storedCountries = JSON.parse(localStorage.getItem("countries"));

            if (storedCountries.length > 0) {
              return loadFromStore();
            }
          }



        // Call the getTodos method, convert it to an observable
        return this.countryService.getCountries().pipe(
          // Take the returned value and return a new success action containing the todos
          map((countries) => {

                 localStorage.setItem('countries', JSON.stringify(countries));

                  return loadCountriesSuccess({countries: countries});

            }
          )
        );

}
      )
    )
  );

 // Run this code when the addTodo or removeTodo action is dispatched

  // saveTodos$ = createEffect(
  //       () =>
  //         this.actions$.pipe(
  //           ofType(updateCountries),
  //           // @ts-ignore
  //           withLatestFrom(this.store.select('countries')),
  //           switchMap(([action, countries]) => from(this.countryService.saveCountries(todos)))
  //         ),
  //       // Most effects dispatch another action, but this one is just a "fire and forget" effect
  //       { dispatch: false }
  //     );

}
