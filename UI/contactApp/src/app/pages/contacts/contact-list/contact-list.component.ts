import { MessageService } from 'primeng/api';
import { ContactsEditComponent } from './../contacts-edit/contacts-edit.component';
import { ContactsCreateComponent } from './../contacts-create/contacts-create.component';
import { catchError, debounceTime, Subject, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Contact } from './../../../services/contacts/contact';

import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { errorHandling } from 'src/app/services/error-handling';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(public svc: ContactsService, public dynamicDialog: DialogService, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
    activatedRoute.data.subscribe({next: (e) =>  {
      if(e["name"] == "archived"){
        this.archived = true;
      }else{
        this.archived = false;
      }
    }})

   }

  contacts : Array<Contact> = [];
  totalCount: number = 0;
  first: number = 0;
  rowsPerPage : number = 10;
  searchTextSubject: Subject<string> = new Subject<string>();
  archived: boolean = false;
  searchText?: string;

  ngOnInit() {
      this.fetchData();
      this.searchTextSubject.pipe(debounceTime(500)).subscribe(res=>{
        this.searchText = res;
        this.fetchData();
      })
  }

  fetchData(){
    var params = new HttpParams();
    params = params.append("startAt", this.first);
    params = params.append("count", this.rowsPerPage);
    if(this.searchText){
      params = params.append("searchText", this.searchText);
    }
    if(this.archived){
      params = params.append("showRetired", true);
    }

    this.svc.fetchLatest(params).subscribe(res=>{
      this.contacts = res.data;
      this.totalCount = res.totalCount
    })
  }
  paginate(event:any){
      this.first = event.first;
      this.rowsPerPage = event.rows;
      this.fetchData();
  }
  search(event: any){
    this.searchTextSubject.next(event.target.value);
  }

  open(item?: any){
    let ref;
    if(item){
      ref = this.dynamicDialog.open(ContactsEditComponent, {
        header: 'Edit a contact',
        width: '500px',
        data: item,
      });
    }else{
      ref = this.dynamicDialog.open(ContactsCreateComponent, {
        header: 'Create new contact',
        width: '500px'
    });
    }
    ref.onClose.subscribe(res=>{
      this.fetchData();
    })
  }
  archive(item:any){
    this.svc.delete(item.id).pipe(
      catchError((err: any) => {
      errorHandling(err, this.messageService);
      return throwError(err);
  })).subscribe(res=>{
    this.messageService.add({
      severity: 'success',
      summary: 'Successfully archived',
      detail: 'The contact is archived. It will be deleted automatically after 30 days'
    });
    this.fetchData();
  },err=>{});
  }

  recover(item:any){
    this.svc.recover(item.id).pipe(
      catchError((err: any) => {
      errorHandling(err, this.messageService);
      return throwError(err);
  })).subscribe(res=>{
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'The contact is recovered successfully.'
    });
    this.fetchData();
  },err=>{});
  }
}
