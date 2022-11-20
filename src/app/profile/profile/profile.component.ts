import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxPermissionsService } from 'ngx-permissions';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SharedService } from 'src/app/shared/shared.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isTourAdmin: boolean = false;
  tourProfileForm: UntypedFormGroup;
  constructor(
    private permissions: NgxPermissionsService,
    private sharedService: SharedService,
    private profileService: ProfileService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.tourProfileForm = new UntypedFormGroup({
      firstName: new UntypedFormControl(),
      lastName: new UntypedFormControl()
    })
  }

  ngOnInit(): void {
    if (Object.keys(this.permissions.getPermissions()).includes('accessMenuTour')) {
      this.isTourAdmin = true;
      this.getTourProfile();
    }
  }

  getTourProfile() {
    this.sharedService.getUserInfo().subscribe({
      next: (response) => {
        this.tourProfileForm.patchValue(response);
      }
    })
  }

  onSave() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        content: 'Confirm save profile'
      }
    }).afterClosed().subscribe({
      next: (answer) => {
        if(this.isTourAdmin){
          this.profileService.updateTourProfiles(this.tourProfileForm.value).subscribe({
            next: () => {
              this.matSnackBar.open('Profile has updated')
            }
          })
        }
      }
    })
  }

}
