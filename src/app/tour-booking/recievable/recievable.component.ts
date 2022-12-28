import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { TourAdminService } from 'src/app/tour-admin/tour-admin.service';
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
  // form: FormGroup;
  displayedColumns: string[] = [
    'bookindId',
    'tourDate',
    'status',
    'paymentDate',
    'total',
    'action',
  ];

  dataSource = new MatTableDataSource();
  tourList: any;
  companyId: any;
  constructor(
    private matDialog: MatDialog,
    private tourBookingService: TourBookingService,
    private matSnackBar: MatSnackBar,
    private tourAdminService: TourAdminService
  ) {
    // this.form = new FormGroup({
    //   companyId: new FormControl()
    // })
  }

  ngOnInit(): void {
    // this.openTourNote(1);
    this.tourBookingService.getReceivable("").subscribe((response)=>{
      this.dataSource = response;
    });

    this.tourAdminService.getTourAdmins({}).subscribe({
      next: (response) => {
        console.log(response);
        this.tourList = response.datas;
        // this.form.get('companyId').setValue(response.datas[0].id);
        // this.onSelectTour({value: response.datas[0].id});
      },
      error:(error)=>{
        this.tourList = [];
        this.matSnackBar.open(error.error.message);
      }
    })
  }


  onSelectTour(event) {
    if(event.value !== null){
      this.companyId = event.value;
    }

    this.tourBookingService.getReceivable(this.companyId).subscribe((response)=>{
      this.dataSource = response;
    });
    // this.payableService.getPayableCompany(event.value).pipe(
    //   map((res)=>{
    //     return res.map((d)=> {d.note = ""; return d;} );
    //   })
    // ).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.dataTable = response;
    //     // this.summary = response.map((r)=> parseFloat(r.netValue)).reduce((a,b) => a+b);
    //   },
    //   error:(error)=>{
    //     this.dataTable = [];
    //     this.matSnackBar.open(error.error.message);
    //   }
    // })
  }

  openNote(element){
    this.matDialog.open(BookingNoteDialogComponent, {
      data: {
        bookingCode: element.bookingCode
      },
      width: '100%'
    }).afterClosed().subscribe({
      next: (answer) => {
        this.onSelectTour(null);
        // if(answer){
        // }
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
