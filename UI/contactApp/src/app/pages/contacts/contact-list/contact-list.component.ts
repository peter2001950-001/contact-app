import { MessageService } from 'primeng/api';
import { ContactsEditComponent } from './../contacts-edit/contacts-edit.component';
import { ContactsCreateComponent } from './../contacts-create/contacts-create.component';
import { catchError, debounceTime, Subject, takeUntil, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Contact } from 'src/app/app-state/entity/contact.entity';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { errorHandling } from 'src/app/services/error-handling';
import { Store } from '@ngrx/store';
import * as contactActions from "../../../app-state/actions/contact.actions";
import * as fromRoot from '../../../app-state';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  constructor(public dynamicDialog: DialogService, private activatedRoute: ActivatedRoute, private messageService: MessageService, private readonly store: Store) {
    activatedRoute.data.subscribe({next: (e) =>  {
      if(e["name"] == "archived"){
        this.archived = true;
      }else{
        this.archived = false;
      }
    }})

    this.store.select(fromRoot.getContacts).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
        console.log(data);
        this.contacts = data.contacts !== undefined? data.contacts : []
      }
    );

   }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  destroy$: Subject<boolean> = new Subject<boolean>();
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

    this.store.dispatch(contactActions.getContacts({params}))
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
    this.store.dispatch(contactActions.deleteContact({contactId: item.id}));

  //   this.svc.delete(item.id).pipe(
  //     catchError((err: any) => {
  //     errorHandling(err, this.messageService);
  //     return throwError(err);
  // })).subscribe(res=>{
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Successfully archived',
  //     detail: 'The contact is archived. It will be deleted automatically after 30 days'
  //   });
  //   this.fetchData();
  // },err=>{});
  }

  recover(item:any){
  //   this.svc.recover(item.id).pipe(
  //     catchError((err: any) => {
  //     errorHandling(err, this.messageService);
  //     return throwError(err);
  // })).subscribe(res=>{
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Success',
  //     detail: 'The contact is recovered successfully.'
  //   });
  //   this.fetchData();
  // },err=>{});
  }
}
