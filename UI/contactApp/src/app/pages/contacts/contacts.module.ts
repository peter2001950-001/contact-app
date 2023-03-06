import { ContactsEditModule } from './contacts-edit/contacts-edit.module';
import { ContactsEditComponent } from './contacts-edit/contacts-edit.component';
import { ContactsFormModule } from './contacts-form/contacts-form.module';
import { ContactsCreateModule } from './contacts-create/contacts-create.module';
import { ContactListModule } from './contact-list/contact-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ContactListModule,
    ContactsCreateModule,
    ContactsEditModule
  ]
})
export class ContactsModule { }
