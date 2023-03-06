
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsCreateComponent } from './contacts-create.component';
import { ContactsFormModule } from '../contacts-form';



@NgModule({

  imports: [
    CommonModule,
    ContactsFormModule
  ],
  declarations: [
    ContactsCreateComponent
  ],
})
export class ContactsCreateModule { }
