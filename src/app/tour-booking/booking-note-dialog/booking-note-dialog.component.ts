import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPeriodDialogComponent } from '../add-period-dialog/add-period-dialog.component';
import { TourBookingService } from '../tour-booking.service';

@Component({
  selector: 'app-booking-note-dialog',
  templateUrl: './booking-note-dialog.component.html',
  styleUrls: ['./booking-note-dialog.component.scss']
})
export class BookingNoteDialogComponent implements OnInit {

  receivableNote;
  tourPayableNote;
  hotelPayableNote;

  tourPeriods: any[] = [];
  hotelPeriods: any[] = [];

  noteForm: FormGroup;

  bookingCode;
  constructor(
    private matDialog: MatDialog,
    public matDialogRef: MatDialogRef<BookingNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tourBookingService: TourBookingService
  ) {
    this.noteForm = new FormGroup({
      receive: new FormControl(''),
      tour: new FormControl(''),
      hotel: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.bookingCode = this.data.bookingCode;
    this.tourBookingService.getReceivableDetail(this.data.bookingCode).subscribe((response) => {
      this.receivableNote = response.receivableNote;
      this.tourPayableNote = response.tourPayableNote;
      this.hotelPayableNote = response.hotelPayableNote;
    })
  }

  addTourPeriod(e) {
    console.log('addTourPeriod()');
    e.stopPropagation();
    this.matDialog.open(AddPeriodDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe((answer) => {
      console.log(answer);
      if (answer) {
        this.tourPeriods.push(answer);
      }
    })
  }
  addHotelPeriod(e) {
    console.log('addTourPeriod()');
    e.stopPropagation();
    this.matDialog.open(AddPeriodDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe((answer) => {
      console.log(answer);
      if (answer) {
        this.hotelPeriods.push(answer);
      }
    })
  }

  onSaveAll() {
    const data = {
      receivableNote: {
        note: this.noteForm.get('receive').value
      },
      tourPayableNote: {
        note: this.noteForm.get('tour').value,
        periods: this.tourPeriods
      },
      hotelPayableNote: {
        note: this.noteForm.get('hotel').value,
        periods: this.hotelPeriods
      }
    }
    this.tourBookingService.onSavePayableNote(this.bookingCode, data).subscribe({
      next: (response) => {
        this.matDialogRef.close(response);
      }
    })
  }

}
