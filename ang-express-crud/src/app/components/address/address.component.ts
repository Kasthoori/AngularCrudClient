import { ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { FormsModule, AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, Subscription } from 'rxjs';
import { Address } from '../../address';


declare var AddressFinder: any;
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      //useExisting: forwardRef(() => AddressComponent)
      useExisting: forwardRef(() => AddressComponent)
    },

    {
      provide: MatFormFieldControl,
      multi: true,
      useExisting: forwardRef(() => AddressComponent)
    },

    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AddressComponent)
    }
  ]
})
export class AddressComponent implements  ControlValueAccessor, OnDestroy, OnInit, Validators {


form: FormGroup;
subscriptions: Subscription[] = [];

onTouched: any = () => {};
onChange: any = () => {};
changeDetector: any;


get value(): Address {

  return this.form.value;

}

set value(value: Address){

  this.form.setValue(value);
  this.onChange(value);
  this.onTouched();
}

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef){

    this.form = this.fb.group({
      addressLine1:[
        null,
        [Validators.required]
      ],

      addressLine2: [
        null,
        [Validators.required]
      ],
      postCode: [
        null,
        [Validators.required]
      ]
    });


    this.subscriptions.push(

      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
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

 ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }


  registerOnChange(fn: any){
    this.onChange = fn;
  }

  setDisabledState(disabled: boolean){
    if(disabled){
      this.form.disable();
    }else{
      this.form.enable();
    }
  }

  writeValue(value: any){
    if(value){
      this.value = value;
    }

    if(value === null){
      this.form.reset();
    }
  }

  registerOnTouched(fn: any){
    this.onTouched = fn;
  }

  public checkError = (controlName: string, errorName:string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  get addressLine1Control() {
    return this.form.controls.addressLine1;
  }

  validate(_:FormControl){
    return this.form.valid ? null : {address: {valid: false}};
  }

   ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }



}
