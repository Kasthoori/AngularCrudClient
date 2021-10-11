import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { Address } from 'src/app/address';
import { AddressComponent } from '../address/address.component';
import { TelInputComponent } from '../tel-input/tel-input.component';

import { AddBookComponent } from './add-book.component';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;

  beforeEach(async () =>  {

      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule
        ],
        declarations: [
          AddBookComponent,
          AddressComponent,
          TelInputComponent
        ]
      }).compileComponents()

  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
