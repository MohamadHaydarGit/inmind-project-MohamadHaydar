import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCountries,
  loadCountriesSuccess, loadFromStore,
} from './countries.actions';
import { CountryService } from '../services/coutry-service/country.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

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
          // @ts-ignore

          var storedCountries = JSON.parse(localStorage.getItem("countries"));
          if(storedCountries.length>0){
            return loadFromStore();
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
  //     saveTodos$ = createEffect(
  //       () =>
  //         this.actions$.pipe(
  //           ofType(addTodo, removeTodo),
  //           withLatestFrom(this.store.select(selectAllTodos)),
  //           switchMap(([action, todos]) => from(this.todoService.saveTodos(todos)))
  //         ),
  //       // Most effects dispatch another action, but this one is just a "fire and forget" effect
  //       { dispatch: false }
  //     );

}
