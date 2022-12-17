import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { HotelAdminService } from '../hotel-admin.service';
import { SharedService } from '../../shared/shared.service';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';

@Component({
  selector: 'app-hotel-admin-form',
  templateUrl: './hotel-admin-form.component.html',
  styleUrls: ['./hotel-admin-form.component.scss']
})
export class HotelAdminFormComponent implements OnInit {

  form: UntypedFormGroup;
  id: string;
  data: any = {};

  ownerId: string;

  countryOptions: any[] = [];
  provinceOptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private router: Router,
    private hotelAdminService: HotelAdminService,
    private matSnackbar: MatSnackBar,
    private sharedService: SharedService
  ) {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(),
      hotelName: new UntypedFormControl(),
      firstName: new UntypedFormControl(),
      lastName: new UntypedFormControl(),
      referenceName: new UntypedFormControl(),
      email: new UntypedFormControl(),
      mobileNo: new UntypedFormControl(),
      address: new UntypedFormControl(),
      country: new UntypedFormControl(),
      province: new UntypedFormControl(),
      status: new UntypedFormControl(),
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id == 'create') {
      this.id = null;
      // this.data = {hotelName: null, contactName: null, email: null, address: null, status: null, mobileNo: null}
    } else {
      this.hotelAdminService.getHotelAdmin(this.id).subscribe({
        next: (response) => {
          // console.log(response);
          // this.data = response;
          this.ownerId = response.ownerId;
          this.form.patchValue(response);
          this.form.disable();
        },
        error: (error) => {
          console.log(error);
          this.matSnackbar.open(error.error.message);
        }
      });
      // this.data = {hotelName: 'Oakwood Suites Bangkok', contactName: 'General Suites', email: 'general.suites-bangkok@oakwood.com', address: 'Bangkok\n10120', status: null}
    }

    this.sharedService.getCountries().subscribe((response) => {
      this.countryOptions = response;
    });

    this.form.get('country').valueChanges.subscribe((countryCode) => {
      this.sharedService.getProvinces(countryCode).subscribe((response) => {
        this.provinceOptions = response;
      });
    })

  }

  back() {
    this.location.back()
  }

  openVerifyDialog() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want to verify',
        content: this.form.get('hotelName').value,
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer) => {
      console.log(answer);

      if (answer) {
        // this.data.status = 'Enable'
        this.hotelAdminService.setHotelAdminStatus(this.id, 'verify').subscribe({
          next: (response) => {
            this.matSnackbar.open(`${this.form.get('hotelName').value} has been verfified.`);
            this.form.get('status').setValue(response.status);
            this.id = response.id;
            this.router.navigate(['hotel-admin']);
          },
          error: (error) => {
            console.log(error);
            this.matSnackbar.open(error.error.message);
          }
        })
      }
    });
  }

  openUnVerifyDialog() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want to unverify',
        content: this.form.get('hotelName').value,
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer) => {
      console.log(answer);

      if (answer) {
        // this.data.status = 'Enable'
        this.hotelAdminService.setHotelAdminStatus(this.id, 'unverify').subscribe({
          next: (response) => {
            this.matSnackbar.open(`${this.form.get('hotelName').value} has been unverfified.`);
            this.form.get('status').setValue(response.status);
            this.id = response.id;
            this.router.navigate(['hotel-admin']);
          },
          error: (error) => {
            console.log(error);
            this.matSnackbar.open(error.error.message);
          }
        })
      }
    });
  }

  openSaveDialog() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want to save',
        content: '',
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer) => {
      console.log(answer);

      if (answer) {
        this.hotelAdminService.createHotelAdmin(this.form.value).subscribe({
          next: (response) => {
            this.matSnackbar.open(`Hotel admin has been created.`);
            this.router.navigate(['hotel-admin']);
          },
          error: (error) => {
            console.log(error);
            this.matSnackbar.open(error.error.message);
          }
        })
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
