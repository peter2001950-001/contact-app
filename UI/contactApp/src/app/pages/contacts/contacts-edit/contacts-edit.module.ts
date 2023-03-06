import { ContactsFormModule } from './../contacts-form/contacts-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsEditComponent } from './contacts-edit.component';



@NgModule({
  declarations: [
    ContactsEditComponent
  ],
  imports: [
    CommonModule,
    ContactsFormModule
  ]
})
export class ContactsEditModule { }
