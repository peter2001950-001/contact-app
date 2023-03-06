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
    ContactsCreateModule
  ]
})
export class ContactsModule { }
