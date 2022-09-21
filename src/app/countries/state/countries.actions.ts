import { createAction, props } from "@ngrx/store";
import {Country} from '../../models/country';

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
