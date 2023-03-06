import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent {
    @Output() submit = new EventEmitter<any>()
    @Output() close = new EventEmitter<any>()
}
