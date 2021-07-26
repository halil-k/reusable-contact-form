import {Component, Input, OnInit} from '@angular/core';
import {SelectedInputs} from "../contact-form.component";
import {startCase} from "lodash";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  @Input() controlName: string;
  @Input() form: FormGroup;
  @Input() darkMode: boolean;
  @Input() inputsObj: SelectedInputs | any;
  placeholder: string;
  titleCase = startCase;


  constructor() { }

  ngOnInit(): void {
    this.placeholder = startCase(this.inputsObj?.[this.controlName]?.placeholder ?? this.controlName);
    this.placeholder = this.placeholder.slice(0, 1) + this.placeholder.slice(1,this.placeholder.length).toLowerCase();
  }

  getErrorTip(control: string): string {
    const errors = this.form.get(control).errors;

    if (errors?.required) { return 'Please input your ' + startCase(control).toLowerCase() }
    else if (errors?.email) { return 'Please input a valid email address' }
    else if (errors?.maxlength) { return `Exceeded maximum character limit: ${this.inputsObj[this.controlName]?.maxChar}` }
  }

}
