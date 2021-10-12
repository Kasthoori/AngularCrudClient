import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
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
    NgForm,
    ReactiveFormsModule,
    FormsModule
 } from '@angular/forms';

 import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
 import { Subject } from 'rxjs';
 import { MyTel } from '../../my-tel';
import { TelInputComponent } from '../tel-input/tel-input.component';
import { Address } from '../../address';
import { CrudService } from 'src/app/Service/crud-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, Validators {

  disableSelect = new FormControl(false);

  invoiceForm: FormGroup;


  form: FormGroup = new FormGroup({
      phone: new FormControl(new MyTel('', '', ''))
  });

  declare address1Elementresult: string;

  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

   constructor(public formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private crudService: CrudService,
    private ngZone: NgZone,
    private router: Router
    ) {
    this.invoiceForm = this.formBuilder.group({
      clientname: [
        null,
        [Validators.required]
      ],
      isGSTExempt:false,
      address: [],
      contfirstname: [''],
      contlastname: [''],
      email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [],
      payterms: ['']

    })
  }


  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  ngOnInit(){

  }

  //Check input errors
  public checkError = (controlName: string, errorName: string) => {
    return this.invoiceForm.controls[controlName].hasError(errorName);
  }


  onSubmit(): any{
   console.log("Object" , JSON.stringify(this.invoiceForm.value));
   console.log(this.invoiceForm.value);

   /*  this.crudService.AddBook(this.invoiceForm.value)
      .subscribe(() => {
          console.log("Data added successfully");
          this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
      }, (err) => {
        console.log(err)
      })
  } */
}
}
