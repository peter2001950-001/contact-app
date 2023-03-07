import { createAction, props } from '@ngrx/store';

export const GET_CONTACTS = '[Contact] Get Contacts';
export const GET_CONTACTS_SUCCESS = '[Contact] Get Contacts Success';
export const GET_CONTACTS_FAILURE = '[Contact] Get Contacts Failure';

export const CREATE_CONTACT = '[CONTACT] Create Contacts';
export const CREATE_CONTACT_SUCCESS = '[CONTACT] Create Contacts Success';
export const CREATE_CONTACT_FAILURE = '[CONTACT] Create Contacts Failure';

export const DELETE_CONTACT = '[CONTACT] Delete Contacts';
export const DELETE_CONTACT_SUCCESS = '[CONTACT] Delete Contacts Success';
export const DELETE_CONTACT_FAILURE = '[CONTACT] Delete Contacts Failure';

export const EDIT_CONTACT = '[CONTACT] Edit Contacts';
export const EDIT_CONTACT_SUCCESS = '[CONTACT] Edit Contacts Success';
export const EDIT_CONTACT_FAILURE = '[CONTACT] Edit Contacts Failure';


export const getContacts = createAction(
  GET_CONTACTS,
  props<{params: any}>()
);

export const getContactsSuccess = createAction(
  GET_CONTACTS_SUCCESS,
  props<any>()
);

export const getContactsFailure = createAction(
  GET_CONTACTS_FAILURE,
  props<{any: any}>()
);

export const createContact = createAction(
  CREATE_CONTACT,
  props<{contact: any}>()
);

export const createContactSuccess = createAction(
  CREATE_CONTACT_SUCCESS,
  props<any>()
);

export const createContactFailure = createAction(
  CREATE_CONTACT_FAILURE,
  props<{any: any}>()
);

export const deleteContact = createAction(
  DELETE_CONTACT,
  props<{contactId: any}>()
);

export const deleteContactSuccess = createAction(
  DELETE_CONTACT_SUCCESS,
  props<any>()
);

export const deleteContactFailure = createAction(
  DELETE_CONTACT_FAILURE,
  props<{any: any}>()
);

export const editContact = createAction(
  EDIT_CONTACT,
  props<{contact: any}>()
);

export const editContactSuccess = createAction(
  EDIT_CONTACT_SUCCESS,
  props<any>()
);

export const editContactFailure = createAction(
  EDIT_CONTACT_FAILURE,
  props<{any: any}>()
);
