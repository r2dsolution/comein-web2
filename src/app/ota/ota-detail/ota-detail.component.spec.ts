import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaDetailComponent } from './ota-detail.component';

describe('OtaDetailComponent', () => {
  let component: OtaDetailComponent;
  let fixture: ComponentFixture<OtaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
