import {Component, Input, OnInit, Output} from '@angular/core';
import { startCase } from 'lodash';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {Subject} from "rxjs";


export interface InputParams {
  label?: string;
  placeholder?: string;
  required?: boolean;
  maxChar?: number;
  textArea?: boolean;
  optionalInputKey?: string;
}

export interface SelectedInputs {
  firstName?: InputParams;
  lastName?: InputParams;
  name?: InputParams;
  companyName?: InputParams;
  jobTitle?: InputParams;
  email?: InputParams;
  phoneNumber?: InputParams;
  optional?: InputParams;
}

export interface SelectOptions {
  required?: boolean;
  placeholder?: string;
}

export interface SelectObject {
  country?: SelectOptions,
  state?: SelectOptions,
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() darkMode = false;
  @Input() header: string;
  @Input() description: string;
  @Input() submitText: string;
  @Input() whitePaper: { filePath: string, downloadName: string };
  @Input() size: any = 'default';
  @Input() inputsObj: SelectedInputs | string[];
  @Input() selectFields: SelectObject;
  @Input() checkbox: string;
  @Input() disclaimer: string;
  @Input() buttonTooltip: string;
  @Output() formSubmit$ = new Subject<FormGroup>();
  allControlsArr: string[] = ['firstName', 'lastName', 'name', 'companyName', 'jobTitle', 'email', 'phoneNumber'];
  keys = Object.keys;
  myFormGroup: FormGroup;
  newInputs: SelectedInputs;
  showConfirmationPage = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newInputs = this.buildSelectedInputs(this.inputsObj);
    this.myFormGroup = this.fb.group({})
    this.addControlsToForm(this.newInputs);
  }

  addControlsToForm(newInputs): void {
    this.addInputFieldControls(newInputs);
    this.addSelectFieldControls();
    this.addCheckBoxFieldControl()
    // could add custom control operations here e.g. custom validator for a specific field
  }

  private addInputFieldControls(newInputs): void {
    Object.keys(newInputs).map((input) => this.myFormGroup.addControl(
      input, new FormControl(null, [
          Validators.maxLength(newInputs[input].maxChar),
          newInputs[input].required ? Validators.required : undefined,
          newInputs[input].label === 'email' ? Validators.email : undefined,
        ].filter(el => el != null))
    ));
  }

  private addSelectFieldControls(): void {
    if (Object.keys(this.selectFields)?.length) {
      Object.keys(this.selectFields).map(field => {
        this.myFormGroup.addControl(field, new FormControl(null, [
          this.selectFields[field].required ? Validators.required : undefined
        ].filter(el => el != null)))
      })
    }
  }

  addCheckBoxFieldControl(): void {
    this.myFormGroup.addControl('checkbox', new FormControl(false))
  }

  buildSelectedInputs(inputs:  SelectedInputs | any): SelectedInputs {
    if (Array.isArray(inputs)) {
      return this.mapArrayToInputsObject(inputs);
    } else {
      return this.populateInputParams(inputs);
    }
  }

  mapArrayToInputsObject(inputs:  string[], inputsObj: SelectedInputs = {}): SelectedInputs {
    inputs.map((input: string) => {
      if (this.allControlsArr.includes(input)) {
        inputsObj[input] = {
          label: startCase(input),
          placeholder: `Input your ${startCase(input)}`,
          required: true,
          maxChar: 60,
          textArea: false,
        };
      }
    })

    return inputsObj
  }

  populateInputParams(inputs: SelectedInputs): SelectedInputs {
    let newInputs: SelectedInputs = {};
    Object.keys(inputs).map((input: string) => {
      const placeholder = inputs[input].placeholder; const required = inputs[input].required;
      const maxChar = inputs[input].maxChar; const textArea = inputs[input].textArea;
      if (this.allControlsArr.includes(input)) {
        newInputs[input] = {
          label: input,
          placeholder: placeholder ?? startCase(input),
          required: typeof required === 'undefined' ? true : required,
          textArea: !!textArea,
          maxChar: maxChar ?? 60,
        }
      }
    })
    newInputs = { ...newInputs, ...this.buildOptionaInput(inputs)};

    return newInputs;
  }

  buildOptionaInput(inputs) {
    if (Object.keys(inputs).includes('optional')) {
      const optionalInput = {}
      optionalInput[inputs.optional.optionalInputKey] = {
        label: inputs.optional.label,
        placeholder: inputs.optional.placeholder ?? startCase(inputs.optional.label),
        required: typeof inputs.optional.required === 'undefined' ? true : inputs.optional.required,
        textArea: !!inputs.optional.textArea,
        maxChar: inputs.optional.maxChar ?? 60,
      }

      return optionalInput
    }
  }

  submitForm(): void {
    if (!this.myFormGroup.valid) { return; }

    this.downloadWhitePaperIfExists();
    this.formSubmit$.next(this.myFormGroup);
    this.showConfirmationPage = true;
  }

  private downloadWhitePaperIfExists(): void {
    if (this.whitePaper) {
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.href = `${this.whitePaper.filePath}`;
      link.download = this.whitePaper.downloadName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
}
