import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SharedService } from 'src/app/shared/shared.service';
import { AgencyProfileService } from '../../agency-profile.service';

@Component({
  selector: 'app-agency-profile-form',
  templateUrl: './agency-profile-form.component.html',
  styleUrls: ['./agency-profile-form.component.scss']
})
export class AgencyProfileFormComponent implements OnInit {

  form: UntypedFormGroup;
  id: string;
  data: any = {};
  countryOptions:any[] = [];
  provinceOptions:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private router: Router,
    private tourCompanyService: AgencyProfileService,
    private matSnackbar: MatSnackBar,
    private sharedService: SharedService
  ) {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(),
      image: new UntypedFormControl(),
      companyName: new UntypedFormControl(),
      tatNo: new UntypedFormControl(),
      businessName: new UntypedFormControl(),
      country: new UntypedFormControl(),
      province: new UntypedFormControl(),
      // contactName: new FormControl(),
      firstName: new UntypedFormControl(),
      lastName: new UntypedFormControl(),
      referenceName: new UntypedFormControl(),
      email: new UntypedFormControl(),
      mobileNo: new UntypedFormControl(),
      address: new UntypedFormControl(),
      status: new UntypedFormControl(),
    })
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.sharedService.getUserInfo().subscribe((user)=>{
      // console.log(user.tourId);
      this.tourCompanyService.getTourCompany(user.tourId).subscribe((response)=>{
        this.form.patchValue(response);
      })
    });

    this.sharedService.getCountries().subscribe((response)=>{
      this.countryOptions = response;
    });

    this.form.get('country').valueChanges.subscribe((countryCode)=>{
      this.sharedService.getProvinces(countryCode).subscribe((response)=>{
        this.provinceOptions = response;
      });
    })

    // if(this.id == 'create') { 
    //   this.id = null;
    //   // this.data = {hotelName: null, contactName: null, email: null, address: null, status: null, mobileNo: null}
    // } else {
    //   // this.hotelAdminService.getHotelAdmin(this.id).subscribe((response)=>{
    //   //   // console.log(response);
    //   //   // this.data = response;
    //   //   this.form.setValue(response);
    //   //   this.form.disable();
    //   // });
    //   // this.data = {hotelName: 'Oakwood Suites Bangkok', contactName: 'General Suites', email: 'general.suites-bangkok@oakwood.com', address: 'Bangkok\n10120', status: null}
    // }


    // this.form.get('tourAgencyName').setValue('The river side touring');
    // this.form.get('contactName').setValue('BoonChoo SookSomJai');
    // this.form.get('email').setValue('riverside@gmail.com');
  }

  back(){
    this.location.back()
  }


  openSaveDialog(){
    this.matDialog.open(ConfirmDialogComponent,{
      data: {
        title: 'Do you want to save',
        content: '',
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer)=>{
      console.log(answer);

      if(answer){
        this.tourCompanyService.updateTourCompany(this.form.value.id, this.form.value).subscribe((response)=>{
          this.matSnackbar.open(`Profile has been updated.`);
          this.router.navigate(['agency-profile']);
        })
      }
    });
  }

}
