import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableNoteDialogComponent } from './receivable-note-dialog.component';

describe('ReceivableNoteDialogComponent', () => {
  let component: ReceivableNoteDialogComponent;
  let fixture: ComponentFixture<ReceivableNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivableNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
