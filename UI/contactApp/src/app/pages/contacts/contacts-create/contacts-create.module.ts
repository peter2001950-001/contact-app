import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsCreateComponent } from './contacts-create.component';
import { ContactsFormModule } from '../contacts-form';



@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContactsFormModule
  ],
  declarations: [
    ContactsCreateComponent
  ],
  providers: []
})
export class ContactsCreateModule { }
