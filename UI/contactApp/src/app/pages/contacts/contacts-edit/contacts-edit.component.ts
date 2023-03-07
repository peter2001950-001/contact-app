import { MessageService } from 'primeng/api';
import { ContactsService } from './../../../services/contacts/contacts.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { errorHandling } from 'src/app/services/error-handling';
import { Store } from '@ngrx/store';
import * as contactActions from "../../../app-state/actions/contact.actions";

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss']
})
export class ContactsEditComponent implements OnInit {
    constructor(private readonly store: Store, public config: DynamicDialogConfig , private ref: DynamicDialogRef,  private svc: ContactsService, private messageService: MessageService){}
    public request: any;

    ngOnInit(): void {
        this.request = {...this.config.data};
        var dateOfBirth = this.config.data.dateOfBirth;
        this.request.dateOfBirth = this.parseDateToString(dateOfBirth);
        console.log(this.request);
    }

    onSubmit(event: any){
      this.store.dispatch(contactActions.editContact({contact: {id: this.request.id, ...event}}))
      this.ref.close();
    }


    parseDateToString(dateStr: any){
        var date = new Date(dateStr);
        console.log(date.getMonth());
        return this.twoDigitFormat(date.getDate()) + "/" + this.twoDigitFormat(date.getMonth()+1) + "/" + date.getFullYear();
    }
    twoDigitFormat(num: number){
      if(num<10) return "0"+num;
      else return num;
    }

}
