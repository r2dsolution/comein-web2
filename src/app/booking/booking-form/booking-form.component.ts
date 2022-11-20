import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';
import { BookingVerifyDialogComponent } from '../booking-verify-dialog/booking-verify-dialog.component';
import { BookingService } from '../booking.service';


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  form: UntypedFormGroup;
  id: string;
  data: any = {};
  ownerId: string;
  visitors: any[] = [];
  status: any = "";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private router: Router,
    private bookingService: BookingService,
    private matSnackbar: MatSnackBar
  ) {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      bookingNo: new UntypedFormControl(''),
      roomName: new UntypedFormControl(''),
      roomDesc: new UntypedFormControl(''),
      customerId: new UntypedFormControl(''),
      firstName: new UntypedFormControl(''),
      lastName: new UntypedFormControl(''),
      referenceName: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      mobileNo: new UntypedFormControl(''),
      checkin: new UntypedFormControl(''),
      checkout: new UntypedFormControl(''),
      visitorAdult: new UntypedFormControl(''),
      visitorChild: new UntypedFormControl(''),
      status: new UntypedFormControl('')
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    if (this.id == 'create') {
      this.id = null;
      // this.data = { bookingNo: null, room: null, roomDesc: null, customerEmail: null, customerName: null, customerSurname: null, checkin: null, checkout: null, visitorAdult: null, visitorChild: null, status: null }
    } else {
      this.bookingService.getHotelBooking(this.id).subscribe((response) => {
        this.ownerId = response.ownerId;
        this.id = response.id;
        this.status = response.status;
        this.form.patchValue(response);
        this.form.disable();
        this.bookingService.getBookingVisitors(this.id).subscribe((response: any[]) => {
          console.log(response);
          this.visitors = response;
        });
      })
      // this.data = { bookingNo: 'T1BDAS', room: 'Two-BedroomDeluxe Apartment', roomDesc: 'Two-BedroomDeluxe Apartment', customerEmail: 'customer1@gmail.com', customerName: 'John', customerSurname: 'Alpha', checkin: new Date(), checkout: new Date(), visitorAdult:3, visitorChild:1, status: null }
    }
  }

  confirmConsent(index, consentId) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm consent',
        content: '',
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer) => {
      if (answer) {
        this.bookingService.bookingVisitorConfirm(this.id, consentId).subscribe((response) => {
          this.visitors[index].consent = "Y";
        });
      }
    })
  }

  completeBooking() {
    console.log('completeBooking');
    let isSomeoneInvalid: boolean = false;
    this.visitors.forEach((v) => {
      if (v.status === 'Invalid Confirm') {
        isSomeoneInvalid = true;
      }
    });

    if (isSomeoneInvalid) {
      this.matDialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Some visitors are un-confirmed consent.',
          content: 'Do you want to continue?',
          accept: 'Yes',
          denie: 'No'
        }
      }).afterClosed().subscribe((answer) => {
        if (answer) {
          this.doComplete(this.id);
        }
      });
    } else {
      this.doComplete(this.id);
    }
  }

  doComplete(id) {
    this.bookingService.bookingComplete(id).subscribe((response) => {
      // this.visitors[index].consent = "Y";
      this.router.navigate(['booking']);
    });
  }

  back() {
    this.location.back()
  }

  onEdit() {
    this.form.enable();
  }

  openVerifyDialog() {
    this.matDialog.open(BookingVerifyDialogComponent, {
      data: {
        title: 'Do you want to confirm',
        content: `Booking no: ${this.form.get('bookingNo').value}`,
        email: this.form.get('email').value,
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((email) => {
      if (email) {
        // this.data.status = 'Enable'
        this.bookingService.setHotelBookingStatus(this.id, email).subscribe((response) => {
          this.matSnackbar.open(`${this.form.get('bookingNo').value} has invited.`);
        })
      }
    });
  }

  openSaveDialog() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want to save',
        content: ``,
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer) => {
      console.log(answer);

      if (answer) {
        if (this.id) {
          // update
          console.error('method is not available.');
        } else {
          // create
          this.bookingService.createHotelBooking(this.form.value).subscribe(() => {
            this.router.navigate(['booking']);
          });
        }
      }
    });
  }


  viewPersonalInfomation() {
    if (this.ownerId) {
      this.matDialog.open(PersonalDialogComponent, {
        minWidth: '380px',
        data: {
          comeinId: this.ownerId
        }
      }).afterClosed().subscribe(() => {

      })
    }
  }
}

