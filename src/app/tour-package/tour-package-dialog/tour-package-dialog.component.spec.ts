import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPackageDialogComponent } from './tour-package-dialog.component';

describe('TourPackageDialogComponent', () => {
  let component: TourPackageDialogComponent;
  let fixture: ComponentFixture<TourPackageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPackageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPackageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
