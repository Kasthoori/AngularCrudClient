import { Component, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, Subscription } from 'rxjs';
import { Address } from '../../address';
import { IAddress } from '../../iaddress';


declare var AddressFinder: any;
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AddressComponent
    }
  ]
})
export class AddressComponent implements ControlValueAccessor, OnDestroy, OnInit, Validators {

  address: FormGroup = this.fb.group({

    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
   // addressLine3: [null, [Validators.required]],
    postCode: [null, [Validators.required]]
  });


  onTouched: Function = () => {};
  onChangeSubs: Subscription[] = [];

  constructor(private fb: FormBuilder){}


  ngOnDestroy() {
    for(let sub of this.onChangeSubs){
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any){
    const sub = this.address.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: Function){
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean){
    if(disabled){
      this.address.disable();
    }else{
      this.address.enable();
    }
  }

  writeValue(value: any){
    if(value){
      this.address.setValue(value, {emitEvent: false});
    }
  }

  validate(control: AbstractControl):any{

    if(this.address.valid){
      return null;
    }

    let errors: any = {};

    errors = this.addControlErrors(errors, "addressLine1");
    errors = this.addControlErrors(errors, "addressLine2");
    //errors = this.addControlErrors(errors, "addressLine3");
    errors = this.addControlErrors(errors, "postCode");
  }

  addControlErrors(allErrors: any, controlName:string){
    const errors = {...allErrors};

    const controlErrors = this.address.controls[controlName].errors;

    if(controlErrors){
      errors[controlName] = controlErrors;
    }

    return errors;
  }


  addressfinder: any = [];

  ngOnInit() {
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

          this.addressfinder = {
            test: 'Test'
          }



    widget.on("result:select", function(fullAddress: string, metaData: any){
      var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);


      var address1Element = <HTMLInputElement>document.getElementById("addressLine1")
      var address2Element = <HTMLInputElement>document.getElementById("addressLine2");
      //var cityElement = <HTMLInputElement>document.getElementById("addressLine3");
      var postCodeElement = <HTMLInputElement>document.getElementById("postCode");


      address1Element.value = selected.address_line_1();
      address2Element.value = selected.city();
      //cityElement.value = selected.postcode();
      //cityElement.value = selected.city();
      postCodeElement.value = selected.postcode();


    })

  }


}
