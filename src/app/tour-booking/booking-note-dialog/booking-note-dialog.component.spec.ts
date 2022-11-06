import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNoteDialogComponent } from './booking-note-dialog.component';

describe('BookingNoteDialogComponent', () => {
  let component: BookingNoteDialogComponent;
  let fixture: ComponentFixture<BookingNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
