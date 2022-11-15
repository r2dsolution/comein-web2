import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BookingNoteDialogComponent } from '../booking-note-dialog/booking-note-dialog.component';
import { HotelNoteDialogComponent } from '../hotel-note-dialog/hotel-note-dialog.component';
import { ReceivableNoteDialogComponent } from '../receivable-note-dialog/receivable-note-dialog.component';
import { TourBookingService } from '../tour-booking.service';
import { TourNoteDialogComponent } from '../tour-note-dialog/tour-note-dialog.component';

@Component({
  selector: 'app-recievable',
  templateUrl: './recievable.component.html',
  styleUrls: ['./recievable.component.scss']
})
export class RecievableComponent implements OnInit {

  displayedColumns: string[] = [
    'bookindId',
    'tourDate',
    'status',
    'paymentDate',
    'total',
    'action',
  ];

  dataSource = new MatTableDataSource();
  constructor(
    private matDialog: MatDialog,
    private tourBookingService: TourBookingService
  ) { }

  ngOnInit(): void {
    // this.openTourNote(1);
    this.tourBookingService.getReceivable().subscribe((response)=>{
      this.dataSource = response;
    })
  }

  openNote(element){
    this.matDialog.open(BookingNoteDialogComponent, {
      data: {
        bookingCode: element.bookingCode
      },
      width: '100%'
    }).afterClosed().subscribe({
      next: (answer) => {
        if(answer){
          this.ngOnInit();
        }
      }
    })
  }

  openReceiveNote(index) {
    console.log('open receive dialof', index);
    this.matDialog.open(ReceivableNoteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe({
      next: (answer) => {

      }
    })
  }

  openTourNote(index) {
    this.matDialog.open(TourNoteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe({
      next: (answer) => {

      }
    })
  }

  openHotelNote(index) {
    this.matDialog.open(HotelNoteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe({
      next: (answer) => {

      }
    })
  }

}
