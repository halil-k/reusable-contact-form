import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { ContactFormComponent } from './contact-form/contact-form.component';
import { InputComponent } from './contact-form/input/input.component';
import { TextAreaComponent } from './contact-form/text-area/text-area.component';
import { SelectComponent } from './contact-form/select/select.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    InputComponent,
    TextAreaComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzCheckboxModule,
    NzToolTipModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
