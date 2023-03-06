import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from './contacts-form.component';
import { CalendarModule } from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';



@NgModule({
  declarations: [
    ContactsFormComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule
  ],
  exports:[ContactsFormComponent]
})
export class ContactsFormModule { }
