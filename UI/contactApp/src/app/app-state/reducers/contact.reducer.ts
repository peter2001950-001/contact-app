import { Contact } from "../entity/contact.entity"
import { Action, createReducer, on } from '@ngrx/store';

import * as contactActions from '../actions/contact.actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
  contacts?: Contact[];
  currentContact?: Contact;
  deleteContactId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  contacts: storage.getItem('contact').contacts,
  currentContact: undefined,
  deleteContactId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const contactReducer = createReducer(
  initialState,

  // GeContacts
  on(contactActions.getContacts, (state) => ({...state, isLoading: true})),
  on(contactActions.getContactsSuccess, (state, result) => ({contacts: result.response.data, isLoading: false, isLoadingSuccess: true})),

  // Create Contact Reducers
  on(contactActions.createContact, (state, {contact}) => ({...state, isLoading: true, currentContact: contact})),
  on(contactActions.createContactSuccess, (state, result) => {
    const contacts = undefined !== state.contacts ? _.cloneDeep(state.contacts) : [];
    const currentContact = undefined !== state.currentContact ? _.cloneDeep(state.currentContact) : {};
    currentContact.id = result.contactId;
    contacts.push(currentContact);
    return {
      contacts,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Contact Reducers
  on(contactActions.deleteContact, (state, {contactId}) => ({...state, isLoading: true, deleteContactId: contactId})),
  on(contactActions.deleteContactSuccess, (state, result) => {
    let contacts = undefined !== state.contacts ? _.cloneDeep(state.contacts) : [];
    if (result) {
      console.log(state.deleteContactId);
      contacts = contacts.filter(contact => contact.id !== state.deleteContactId);
    }
    return {
      contacts,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Contact Reducers
   on(contactActions.editContact, (state, {contact}) => ({...state, isLoading: true, currentContact: contact})),
   on(contactActions.editContactSuccess, (state, result) => {
    let contacts = undefined !== state.contacts ? _.cloneDeep(state.contacts) : [];
    const currentContact = undefined !== state.currentContact ? _.cloneDeep(state.currentContact) : {};
    contacts = contacts.map(tsk => {
      if (tsk.id === currentContact.id) {
        tsk = currentContact;
      }
      return tsk;
    });
    return {
      contacts,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return contactReducer(state, action);
}

export const getContacts = (state: State) => {
  return {
    contacts: state.contacts,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
