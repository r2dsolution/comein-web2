import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingVerifyDialogComponent } from './booking-verify-dialog.component';

describe('BookingVerifyDialogComponent', () => {
  let component: BookingVerifyDialogComponent;
  let fixture: ComponentFixture<BookingVerifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingVerifyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingVerifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
