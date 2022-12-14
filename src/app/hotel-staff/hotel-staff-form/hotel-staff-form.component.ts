import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';
import { HotelStaffService } from '../hotel-staff.service';
@Component({
  selector: 'app-hotel-staff-form',
  templateUrl: './hotel-staff-form.component.html',
  styleUrls: ['./hotel-staff-form.component.scss']
})
export class HotelStaffFormComponent implements OnInit {
  form: UntypedFormGroup;
  id: string;
  data: any = {};
  ownerId: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private router: Router,
    private hotelStaffService: HotelStaffService,
    private matSnackBar: MatSnackBar

  ) {
    this.form = new UntypedFormGroup({
      firstName: new UntypedFormControl(),
      lastName: new UntypedFormControl(),
      referenceName: new UntypedFormControl(),
      email: new UntypedFormControl(),
      status: new UntypedFormControl()
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    // console.log(this.id);
    if (this.id == 'create') {
      this.id = null;
    } else {
      this.hotelStaffService.getHotelStaff(this.id).subscribe({
        next: (response) => {
          this.ownerId = response.ownerId;
          this.form.patchValue(response);
          // this.form.get('staffName').setValue(response.staffName);
          // this.form.get('email').setValue(response.email);
          // this.form.get('status').setValue(response.status);
          this.form.disable();
        },
        error: (error) => {
          console.log(error);
          this.matSnackBar.open(error.error.message);
        }
      });
    }


  }

  back() {
    this.location.back()
  }

  onEdit() {
    this.form.enable();
  }

  openVerifyDialog() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Do you want to verify',
        content: this.form.get('staffName').value,
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer) => {
      console.log(answer);
      if (answer) {
        this.hotelStaffService.setHotelStaffStatus(this.id, 'verify').subscribe({
          next: (response) => {
            this.matSnackBar.open(`${this.form.get('staffName').value} is in verify processing.`);
            this.form.get('status').setValue(response.status);
            this.id = response.id;
          },
          error: (error) => {
            console.log(error);
            this.matSnackBar.open(error.error.message);
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
      if (answer) {
        if (this.id) {
          alert(`Method is not available.`);
          // this.hotelStaffService.update(this.form.value).subscribe((response)=>{
          //   this.router.navigate(['hotel-staff']);
          //   this.matSnackBar.open(`Hotel staff has been created.`, 'close' , { duration: 3000 });
          // });
        } else {
          this.hotelStaffService.createHotelStaff(this.form.value).subscribe({
            next: (response) => {
              this.router.navigate(['hotel-staff']);
              this.matSnackBar.open(`Hotel staff has been created.`, 'close', { duration: 3000 });
            },
            error: (error) => {
              console.log(error);
              this.matSnackBar.open(error.error.message);
            }
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