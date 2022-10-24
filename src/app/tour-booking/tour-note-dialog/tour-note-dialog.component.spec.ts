import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourNoteDialogComponent } from './tour-note-dialog.component';

describe('TourNoteDialogComponent', () => {
  let component: TourNoteDialogComponent;
  let fixture: ComponentFixture<TourNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
