import { MessageService } from 'primeng/api';
import { ContactsService } from './../../../services/contacts/contacts.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { errorHandling } from 'src/app/services/error-handling';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss']
})
export class ContactsEditComponent implements OnInit {
    constructor(public config: DynamicDialogConfig , private ref: DynamicDialogRef,  private svc: ContactsService, private messageService: MessageService){}
    public request: any;

    ngOnInit(): void {
        console.log(this.config.data)
        this.request = {...this.config.data};
        var dateOfBirth = this.config.data.dateOfBirth;
        this.request.dateOfBirth = this.parseDateToString(dateOfBirth);
        console.log(this.request);
    }

    onSubmit(event: any){
      this.svc.update(this.request.id, event).pipe(
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
