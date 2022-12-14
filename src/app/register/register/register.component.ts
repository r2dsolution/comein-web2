import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import {Auth} from 'aws-amplify';
import { RegisterService } from '../register.service';
import { SharedService } from '../../shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.scss',
    '../../login/login/login.component.scss',
  ]
})
export class RegisterComponent implements OnInit {

  loginForm: UntypedFormGroup;
  isSubmit: boolean = false;
  isLoading: boolean = false;

  isHotelAdmin: boolean = false;
  isTourAgency: boolean = false;


  countryOptions:any[] = [];
  provinceOptions:any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private matDialog: MatDialog,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private matSnackBar: MatSnackBar
  ) {
    this.auth.signOut();
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(''),
      hotelName: new UntypedFormControl(''),
      companyName: new UntypedFormControl(''),
      mobileNo: new UntypedFormControl(''),
      firstName: new UntypedFormControl(''),
      lastName: new UntypedFormControl(''),
      referenceName: new UntypedFormControl(''),
      country: new UntypedFormControl(),
      province: new UntypedFormControl(),
      accept: new UntypedFormControl(false,[Validators.required]),
      address: new UntypedFormControl('') 
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any)=>{
      console.log(params);

      if(params.for == 'hotel-admin')
        this.isHotelAdmin = true;
      else
        this.isTourAgency = true;

    });

    this.sharedService.getCountries().subscribe((response)=>{
      this.countryOptions = response;
    });

    this.loginForm.get('country').valueChanges.subscribe((countryCode)=>{
      this.sharedService.getProvinces(countryCode).subscribe((response)=>{
        this.provinceOptions = response;
      });
    })
  }

  submit(){
    // this.matDialog.open(AlertDialogComponent,{
    //   data: {
    //     title: 'Register success',
    //     content: 'We will reply to your email as soon as posible',
    //     button: 'Close'
    //   }
    // });

    let formValue = this.loginForm.value;
    formValue.mobileNo = `+66${formValue.mobileNo}`;
    if(this.isHotelAdmin){
      this.isLoading = true;
      this.registerService.hotelAdminRegister(formValue).subscribe({
        next: (response)=>{
          this.isSubmit = true;
        },
        complete: ()=>{
          this.isLoading = false;
        },
        error:(error)=>{
          this.matSnackBar.open(error.error.message);
        }
      });
    }else if(this.isTourAgency){
      this.isLoading = true;
      this.registerService.tourAdminRegister(formValue).subscribe({
        next: (response)=>{
          this.isSubmit = true;
          this.isLoading = false;
        },
        complete: ()=>{
          this.isLoading = false;
        },
        error:(error)=>{
          this.matSnackBar.open(error.error.message);
        }
      });
      // this.isSubmit = true;
    }
  }

  // viewTerm(){
  //   this.matDialog.open(AlertDialogComponent,{
  //     width: '400px',
  //     data:{
  //       title: 'Term & Condition',
  //       content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto impedit saepe eos animi, accusantium temporibus dolore odit dolorum pariatur sint minima iste quasi hic cum vitae nihil repellat nisi deserunt.',
  //       button: 'Close'
  //     }
  //   })
  // }


  viewTerm(){
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/term-condition`])
    );
    window.open(url, '_blank');
  }
}
