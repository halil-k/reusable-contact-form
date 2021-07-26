import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm: FormGroup;
  title = 'my-contact-form';
  fieldsArr = ['firstName', 'lastName', 'name', 'companyName', 'jobTitle', 'emailAddress', 'phoneNumber'];
  fieldsObj = {
    firstName: {
      required: true,
    },
    lastName: {
      required: true,
    },
    email: {
      placeholder: 'Email address',
      required: false,
    },
    phoneNumber: {
      placeholder: 'Mobile Phone Number',
      required: false,
    },
    optional: {
      optionalInputKey: 'help',
      required: false,
      label: 'How can we help?',
      placeholder: 'Please provide some optional feedback to help us improve for next time...',
      textArea: true,
    },
  }

  selectFieldsObj = {
    country: {
      placeholder: 'Country',
      required: true,
    },
    state: {
      placeholder: 'State',
      required: true,
    },
  }

  header = 'Download the white paper';
  description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam debitis illum nam omnis!' +
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam debitis illum nam omnis!';

  handleFormSubmission(form: FormGroup): void {
    this.myForm = form;
    console.log(this.myForm);
    // do stuff
  }
}
