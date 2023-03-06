import { ContactsService } from './../../../services/contacts/contacts.service';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { errorHandling } from 'src/app/services/error-handling';

@Component({
  selector: 'app-contacts-create',
  templateUrl: './contacts-create.component.html',
  styleUrls: ['./contacts-create.component.scss']
})
export class ContactsCreateComponent implements OnInit {

  constructor(private svc: ContactsService, private messageService: MessageService, private ref: DynamicDialogRef) {

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
    this.svc.create(event).pipe(
      catchError((err: any) => {
      errorHandling(err, this.messageService);
      console.log(err);
      return throwError(err);
  })).subscribe(res=>{
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully saved contact'
    });
    this.ref.close(res);
  },err=>{});
  }

  onCancel(event: any){

  }
}
