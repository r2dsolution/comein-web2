import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAdminComponent } from './hotel-admin.component';

describe('HotelAdminComponent', () => {
  let component: HotelAdminComponent;
  let fixture: ComponentFixture<HotelAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
