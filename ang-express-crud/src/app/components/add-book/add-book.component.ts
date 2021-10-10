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

declare var AddressFinder: any;
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
      address_1: [''],
      address_2: [''],
      suburb: [''],
      city: [''],
      postcode: [''],
      country: [''],
      contfirstname: [''],
      contlastname: [''],
      email: [''],
      tel: [''],
      payterms: ['']

    })
  }

  address: any = [];

  ngOnInit(){

    let script = document.createElement("script");
    script.src = "https://api.addressfinder.io/assets/v3/widget.js";
    script.async = true;
    script.onload = this.addressFinder;
    document.body.appendChild(script);

  }

  addressFinder(){

                  let widget = new AddressFinder.Widget(
                    document.getElementById("address"),
                    "YA4QE3RHNDL6VWUGJX8T",
                    "NZ",
                    {}
                  );

          this.address = {
            test: 'Test'
          }



    widget.on("result:select", function(fullAddress: string, metaData: any){
      var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);


      var address1Element = <HTMLInputElement>document.getElementById("address_1")
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


  onSubmit(){
   console.log(JSON.stringify(this.invoiceForm.value));

  }

}
