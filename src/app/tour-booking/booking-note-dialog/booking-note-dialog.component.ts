import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(
    private matDialog: MatDialog,
    public matDialogRef: MatDialogRef<BookingNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tourBookingService: TourBookingService
  ) { }

  ngOnInit(): void {
    this.tourBookingService.getReceivableDetail(this.data.bookingCode).subscribe((response)=>{
      this.receivableNote = response.receivableNote;
      this.tourPayableNote = response.tourPayableNote;
      this.hotelPayableNote = response.hotelPayableNote;
    })
  }

  addTourPeriod(e){
    console.log('addTourPeriod()');
    e.stopPropagation();
    this.matDialog.open(AddPeriodDialogComponent, {
    width: '450px'
    }).afterClosed().subscribe((answer) => {
      console.log(answer);
    })
  }
  addHotelPeriod(e){
    console.log('addTourPeriod()');
    e.stopPropagation();
    this.matDialog.open(AddPeriodDialogComponent, {
    width: '450px'
    }).afterClosed().subscribe((answer) => {
      console.log(answer);
    })
  }

}
