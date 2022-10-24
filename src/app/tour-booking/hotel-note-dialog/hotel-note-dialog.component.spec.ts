import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelNoteDialogComponent } from './hotel-note-dialog.component';

describe('HotelNoteDialogComponent', () => {
  let component: HotelNoteDialogComponent;
  let fixture: ComponentFixture<HotelNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
