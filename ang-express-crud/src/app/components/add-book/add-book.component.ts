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
    Validators
 } from '@angular/forms';

 import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
 import { Subject } from 'rxjs';
 import { MyTel } from '../../my-tel';

declare var AddressFinder: any;
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  disableSelect = new FormControl(false);

  form: FormGroup = new FormGroup({
      tel: new FormControl(new MyTel('', '', ''))
  });

  constructor() { }

  ngOnInit(){

    let script = document.createElement("script");
    script.src = "https://api.addressfinder.io/assets/v3/widget.js";
    script.async = true;
    script.onload = this.initAddressFinder;
    document.body.appendChild(script);
  }

  initAddressFinder(){

    let widget = new AddressFinder.Widget(
      document.getElementById("address"),
      "YA4QE3RHNDL6VWUGJX8T",
      "NZ",
      {}
    );

    widget.on("result:select", function(fullAddress: any, metaData: any){
      var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

      var address1Element = <HTMLInputElement>document.getElementById("address_1");
      var address2Element = <HTMLInputElement>document.getElementById("address_2");
      var suburbElement = <HTMLInputElement>document.getElementById("suburb");
      var cityElement = <HTMLInputElement>document.getElementById("city");
      var postcodeElement = <HTMLInputElement>document.getElementById("postcode");


      address1Element.value = selected.address_line_1();
      address2Element.value = selected.address_line_2();
      suburbElement.value = selected.suburb();
      cityElement.value = selected.city();
      postcodeElement.value = selected.postcode();


    })
  }

}
