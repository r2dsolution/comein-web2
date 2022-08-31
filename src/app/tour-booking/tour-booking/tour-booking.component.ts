import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TourBookingService } from '../tour-booking.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { threadId } from 'worker_threads';
import { DatePickerDialogComponent } from 'src/app/shared/date-picker-dialog/date-picker-dialog.component';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
@Component({
  selector: 'app-tour-booking',
  templateUrl: './tour-booking.component.html',
  styleUrls: ['./tour-booking.component.scss']
})
export class TourBookingComponent implements OnInit {

  searchForm: FormGroup;

  tourBookingList: any[];
  currentFilter:any;
  booking:any;

  constructor(
    private tourBookingService: TourBookingService,
    private matDialog: MatDialog
  ) {
    this.searchForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      bookingCode: new FormControl(),
      dateType: new FormControl('booking'),
      referenceName: new FormControl()

    })
  }

  ngOnInit(): void {
    
  }

  getList(filter, page = 0){
    this.currentFilter = filter;
    this.tourBookingService.getTourBooking({...filter, page}).subscribe((response)=>{
      console.log(response);
      this.tourBookingList = response.datas;
    })
  }

  changeDatePicker(): any {
    this.searchForm.value.startDate = (moment(this.searchForm.value.startDate).format('YYYY-MM-DD'));
    this.searchForm.value.endDate = (moment(this.searchForm.value.endDate).format('YYYY-MM-DD'));
  }

  search(){
    this.changeDatePicker();
    let value = this.searchForm.value;
    if(!moment(value.startDate).isValid()){ value.startDate = null }
    if(!moment(value.endDate).isValid()){ value.endDate = null }
    this.getList(this.searchForm.value);
  }

  cancelTourBooking(booking: any){

    if(booking.cancelFlag === 'Allow' || booking.cancelFlag === 'Warning'){

      let msg = booking.cancelFlag === 'Warning' ? 'This ticket was over due or cancel policy is incorrect.' : `Cancel ${ booking.bookingCode }`;
      this.matDialog.open(ConfirmDialogComponent,{
        data: {
          title: 'Cancel booking',
          content: msg,
          accept: 'Yes',
          denie: 'No'
        }
      }).afterClosed().subscribe((answer)=>{
        console.log(answer);
  
        if(answer){
          this.tourBookingService.cancelTourBooking(booking.bookingCode).subscribe(()=>{
            this.getList(this.currentFilter);
          })
        }
      });
    }else{
      this.matDialog.open(AlertDialogComponent,{
        data: {
          title: 'Cancel booking',
          content: 'This ticket cannot cancel by Cancel policy.',
          button: 'OK'
        }
      }).afterClosed()
    }
  }

  changeBookingDate(booking: any){
    this.matDialog.open(DatePickerDialogComponent,{
      data: {
        title: 'Change booking date for',
        content: booking.bookingCode,
        default: booking.bookingDate,
        accept: 'OK',
        denie: 'Cancel'
      }
    }).afterClosed().subscribe((answer)=>{
      console.log(answer);
      if(answer){
        let date = moment(answer).format('YYYY-MM-DD');
        this.tourBookingService.changeTourBookingDate(booking.bookingCode, date).subscribe(()=>{
          this.getList(this.currentFilter);
        })
      }
    });
  }

  loadDetail(index){
    // console.log(this.tourBookingList[index]);
    this.tourBookingService.getTourBookingDetail(this.tourBookingList[index].bookingCode).subscribe((response)=>{
      // console.log(response);
      this.booking = response;
    })
  }

}
