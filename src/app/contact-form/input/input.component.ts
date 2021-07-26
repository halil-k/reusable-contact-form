import { Component, Input, OnInit } from '@angular/core';
import { SelectedInputs } from "../contact-form.component";
import { startCase } from "lodash";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() controlName: string;
  @Input() form: any;
  @Input() darkMode: boolean;
  @Input() inputsObj: SelectedInputs | any;
  placeholder: string;
  titleCase = startCase;


  constructor() { }

  ngOnInit(): void {
    this.placeholder = startCase(this.inputsObj[this.controlName]?.placeholder ?? this.controlName);
  }

  getErrorTip(control: string): string {
    const errors = this.form.get(control).errors;

    if (errors?.required) { return 'Please input your ' + startCase(control).toLowerCase() }
    else if (errors?.email) { return 'Please input a valid email address' }
    else if (errors?.maxlength) { return `Exceeded maximum character limit: ${this.inputsObj[this.controlName]?.maxChar}` }
  }
}
