import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import {
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Self,
    ViewChild
 } from '@angular/core';

 import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NgControl,
    Validators,
    NgForm
 } from '@angular/forms';

 import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
 import { Subject } from 'rxjs';
 import { MyTel } from '../../my-tel';
import { TelInputComponent } from '../tel-input/tel-input.component';
import { Address } from '../../address';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  disableSelect = new FormControl(false);




  invoiceForm: FormGroup;

  form: FormGroup = new FormGroup({
      tel: new FormControl(new MyTel('', '', ''))

  });

  declare address1Elementresult: string;

   constructor(public formBuilder: FormBuilder) {
    this.invoiceForm = this.formBuilder.group({
      clientname: [''],
      isGSTExempt:false,
      //address_1: [''],
      //address_2: [''],
     // suburb: [''],
      //city: [''],
      //postcode: [''],
      //country: [''],
      address: [''],
      contfirstname: [''],
      contlastname: [''],
      email: [''],
      tel: [''],
      payterms: ['']

    })
  }


  ngOnInit(){

  }


  onSubmit(){
   console.log("Object" , JSON.stringify(this.invoiceForm.value));
   console.log("Submitted")

  }

}
