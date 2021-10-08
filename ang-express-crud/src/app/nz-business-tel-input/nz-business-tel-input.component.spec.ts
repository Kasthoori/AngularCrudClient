import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzBusinessTelInputComponent } from './nz-business-tel-input.component';

describe('NzBusinessTelInputComponent', () => {
  let component: NzBusinessTelInputComponent;
  let fixture: ComponentFixture<NzBusinessTelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NzBusinessTelInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzBusinessTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
