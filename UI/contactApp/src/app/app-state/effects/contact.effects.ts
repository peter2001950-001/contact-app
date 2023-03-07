import { MessageService } from 'primeng/api';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as contactActions from '../actions/contact.actions';

@Injectable()
export class ContactEffects {

  constructor(
    private actions$: Actions,
    private contactService: ContactsService
  ) {}

  getContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.getContacts),
      exhaustMap(action =>
        this.contactService.fetchLatest(action.params).pipe(
          map(response => {
            console.log("response:::", response)
            return contactActions.getContactsSuccess({response})
          }),
          catchError((error: any) => of(contactActions.getContactsFailure(error))))

      )
    )
  );

  createContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.createContact),
      exhaustMap(action =>
        this.contactService.create(action.contact).pipe(
          map(response => {
              return contactActions.createContactSuccess(response)
            }),
          catchError((error: any) => of(contactActions.createContactFailure(error))))
      )
    )
  );


  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.deleteContact),
      exhaustMap(action => this.contactService.delete(action.contactId).pipe(
          map(response => contactActions.deleteContactSuccess(response)),
          catchError((error: any) => of(contactActions.deleteContactSuccess(error))))
      )
    )
  );

  editContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.editContact),
      exhaustMap(action =>
        this.contactService.update(action.contact.id, action.contact).pipe(
          map(response => contactActions.editContactSuccess(response)),
          catchError((error: any) => of(contactActions.editContactFailure(error))))
      )
    )
  );

}
