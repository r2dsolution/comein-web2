import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticDialogComponent } from './notic-dialog.component';

describe('NoticDialogComponent', () => {
  let component: NoticDialogComponent;
  let fixture: ComponentFixture<NoticDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
