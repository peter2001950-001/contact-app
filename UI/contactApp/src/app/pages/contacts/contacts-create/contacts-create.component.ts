import { ContactsService } from './../../../services/contacts/contacts.service';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { errorHandling } from 'src/app/services/error-handling';
import { Store } from '@ngrx/store';
import * as contactActions from "../../../app-state/actions/contact.actions";

@Component({
  selector: 'app-contacts-create',
  templateUrl: './contacts-create.component.html',
  styleUrls: ['./contacts-create.component.scss']
})
export class ContactsCreateComponent implements OnInit {

  constructor(private readonly store: Store, private svc: ContactsService, private messageService: MessageService, private ref: DynamicDialogRef) {

  }
  public request: any;
  ngOnInit(): void {
   this.request = {
      firstName :"",
      surname : "",
      phoneNumber : "",
      dateOfBirth : "",
      address : "",
      iban : "",
   }
  }

  onSubmit(event: any){

    this.store.dispatch(contactActions.createContact({contact: event}))
    this.ref.close();
  }

  onCancel(event: any){

  }
}
