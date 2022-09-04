import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaRematchDialogComponent } from './ota-rematch-dialog.component';

describe('OtaRematchDialogComponent', () => {
  let component: OtaRematchDialogComponent;
  let fixture: ComponentFixture<OtaRematchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtaRematchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaRematchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
