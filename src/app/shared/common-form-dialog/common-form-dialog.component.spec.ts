import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFormDialogComponent } from './common-form-dialog.component';

describe('CommonFormDialogComponent', () => {
  let component: CommonFormDialogComponent;
  let fixture: ComponentFixture<CommonFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
