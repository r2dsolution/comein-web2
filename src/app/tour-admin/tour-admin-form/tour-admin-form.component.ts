import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';
import { TourAdminService } from '../tour-admin.service';

@Component({
  selector: 'app-tour-admin-form',
  templateUrl: './tour-admin-form.component.html',
  styleUrls: ['./tour-admin-form.component.scss']
})
export class TourAdminFormComponent implements OnInit {

  form: FormGroup;
  id: string;
  data: any = {};
  ownerId: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private router: Router,
    private tourAdminService: TourAdminService,
    private matSnackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      id: new FormControl(),
      companyName: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      referenceName: new FormControl(),
      email: new FormControl(),
      mobileNo: new FormControl(),
      address: new FormControl(),
      status: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id == 'create') { 
      this.id = null;
      // this.data = {hotelName: null, contactName: null, email: null, address: null, status: null, mobileNo: null}
    } else {
      this.tourAdminService.getTourAdmin(this.id).subscribe((response)=>{
        this.ownerId = response.ownerId;
        this.form.patchValue(response);
        this.form.disable();
      });
      // this.form.patchValue({
      //   'position': '',
      //   'tourName': 'กัสโต้ เวิล์ด ทัวร์',
      //   'contactName': 'บริษัท กัสโต้ เวิล์ด ทัวร์ จำกัด',
      //   'email': 'www.gustotour.com',
      //   'phone': '02-542-4040',
      //   'status': 'Disabled',
      //   'action': ''
      // });
      this.form.disable();
      // this.data = {hotelName: 'Oakwood Suites Bangkok', contactName: 'General Suites', email: 'general.suites-bangkok@oakwood.com', address: 'Bangkok\n10120', status: null}
    }

    
  }

  back(){
    this.location.back()
  }

  openVerifyDialog(){
    this.matDialog.open(ConfirmDialogComponent,{
      data: {
        title: 'Do you want to verify',
        content: '',
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer)=>{
      console.log(answer);

      if(answer){
        // this.data.status = 'Enable'
        this.tourAdminService.setTourAdminStatus(this.id, 'verify').subscribe((response)=>{
          this.matSnackbar.open(`Tour admin has been verfified.`);
          this.form.get('status').setValue(response.status);
          this.id = response.id;
          this.router.navigate(['tour-admin'])
        })
      }
    });
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
        this.tourAdminService.createTourAdmin(this.form.value).subscribe((response)=>{
          this.matSnackbar.open(`Tour admin has been created.`);
          this.router.navigate(['tour-admin']);
        })
      }
    });
  }

  viewPersonalInfomation() {
    if(this.ownerId){
      this.matDialog.open(PersonalDialogComponent, {
        minWidth: '380px',
        data:{
          comeinId: this.ownerId
        }
      }).afterClosed().subscribe(() => {
  
      })
    }
  }

}
