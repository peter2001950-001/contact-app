import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from './contacts-form.component';
import {InputMaskModule} from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule
  ],
  exports:[ContactsFormComponent]
})
export class ContactsFormModule { }
