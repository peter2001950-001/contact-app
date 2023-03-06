import { ContactsCreateComponent } from './../contacts-create/contacts-create.component';
import { debounceTime, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Contact } from './../../../services/contacts/contact';

import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(public svc: ContactsService, public dynamicDialog: DialogService) { }

  contacts : Array<Contact> = [];
  totalCount: number = 0;
  first: number = 0;
  rowsPerPage : number = 10;
  searchTextSubject: Subject<string> = new Subject<string>();

  ngOnInit() {
      this.fetchData();
      this.searchTextSubject.pipe(debounceTime(500)).subscribe(res=>{
        this.fetchData(res);
      })
  }

  fetchData(searchText?: any){
    var params = new HttpParams();
    params = params.append("startAt", this.first);
    params = params.append("count", this.rowsPerPage);
    if(searchText){
      params = params.append("searchText", searchText);
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
    if(item){

    }else{
      const ref = this.dynamicDialog.open(ContactsCreateComponent, {
        header: 'Create new contact',
        width: '500px'
    });
    }
  }

}
