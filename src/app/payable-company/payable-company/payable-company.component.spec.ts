import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableCompanyComponent } from './payable-company.component';

describe('PayableCompanyComponent', () => {
  let component: PayableCompanyComponent;
  let fixture: ComponentFixture<PayableCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayableCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayableCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
