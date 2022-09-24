import { createAction, props } from "@ngrx/store";
import {Country} from '../../models/country';

//creating actions and exporting them for use within the reducer
export const loadCountries = createAction(
  '[Countries Page] Load Countries',
  );

export const loadCountriesSuccess = createAction(
  '[Country API] Country Load Success',
  props<{ countries: Country[] }>()
);

export const loadFromStore = createAction(
  '[Country API] Country Load Success',
);

export const updateCountries = createAction(
  '[Country API] Update Country',
        props<{ country: any }>()
);
