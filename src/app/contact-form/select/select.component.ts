import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import { SelectObject } from "../contact-form.component";
import { Country, State }  from 'country-state-city';


interface SelectFieldsIterator {
  name: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() selectFields: SelectObject;
  @Input() form: FormGroup;
  @Input() darkMode: boolean;
  countries = Country.getAllCountries().map(country => ({ value: country.isoCode, label: country.name }));
  states = State.getAllStates().map(state => ({ value: state.isoCode, label: state.name }));
  selectFieldsIterator;

  constructor() { }

  ngOnInit(): void {
    this.selectFieldsIterator = Object.keys(this.selectFields).map(field => ({
      name: field,
      required: this.selectFields[field].required,
      placeholder: this.selectFields[field].placeholder,
      options: field === 'country' ? this.countries : this.states,
    })).slice(0, 2);
  }

  updateStates(field: string): void {
    if (field === 'country' && this.selectFields.state) {
      this.states = State.getStatesOfCountry(this.form.value.country).map(state => ({ value: state.isoCode, label: state.name }));
      this.form.controls.state.setValue('');
      this.selectFieldsIterator = this.selectFieldsIterator.map(field => {
        return field.name === 'state' ? { ...field, options: this.states } : field;
      })
    }
    !this.states.length ? this.form.get('state').clearValidators() : this.form.get('state').setValidators(Validators.required);
  }
}
