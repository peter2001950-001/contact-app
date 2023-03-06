import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent implements OnInit {
  @Input() public request: any;
  @Output() public submit = new EventEmitter<any>();
  @Output() public close = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}
  form!: FormGroup;


  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
        var body = this.form.getRawValue();
        body.dateOfBirth = this.parseDateFromString(body.dateOfBirth);
        this.submit.emit(body);
    }
  }
  ngOnInit(): void {
    const { firstName, surname, phoneNumber, address, iban, dateOfBirth } =
      this.request;

      this.form = this.fb.group({
      firstName: this.fb.control(firstName, [Validators.required]),
      surname: this.fb.control(surname, [Validators.required]),
      phoneNumber: this.fb.control(phoneNumber, [Validators.required]),
      address: this.fb.control(address, [Validators.required]),
      iban: this.fb.control(iban, [Validators.required]),
      dateOfBirth: this.fb.control(dateOfBirth, [Validators.required]),
    });
  }

  convertDateToUTCDate(event: Date){
    var date = new Date();
    date.setUTCFullYear(event.getFullYear())
    date.setUTCMonth(event.getMonth())
    date.setUTCDate(event.getDate())
    date.setUTCHours(0)
    date.setUTCMinutes(0)
    date.setUTCSeconds(0)
    return date;
  }

  parseDateFromString(dateOfBirth: any) {
    var parts = dateOfBirth.split('/');
    var mydate = new Date(parts[2], parts[1] - 1, parts[0]);

    return this.convertDateToUTCDate(mydate);
  }
}
