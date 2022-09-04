import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyProfileFormComponent } from './agency-profile-form.component';

describe('AgencyProfileFormComponent', () => {
  let component: AgencyProfileFormComponent;
  let fixture: ComponentFixture<AgencyProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
