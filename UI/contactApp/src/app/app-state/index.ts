import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import * as fromContact from './reducers/contact.reducer';

export interface State {
  contact: fromContact.State;
}

export const reducers: ActionReducerMap<State> = {
  contact: fromContact.reducer,
};

const reducerKeys = ['contact'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];


export const getContactState = createFeatureSelector<fromContact.State>('contact');

export const getContacts = createSelector(
  getContactState,
  fromContact.getContacts
);
