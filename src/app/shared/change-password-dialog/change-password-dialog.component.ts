import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private matSnackBar: MatSnackBar,
    private sharedService: SharedService
  ) {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
      newPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new UntypedFormControl('')
    },{
      validators: formValidate
    });
  }

  ngOnInit(): void {
    this.sharedService.getUserInfo().subscribe({
      next: (response)=>{
        this.form.get('email').setValue(response.email);
        // this.form.get('email').setValue('example@email.com');
      }
    })
  }

  

  confirm(){
    this.auth.changePassword(
      this.form.get('email').value,
      this.form.get('password').value,
      this.form.get('newPassword').value
    ).subscribe({
      next: (response)=>{
        this.matSnackBar.open(`Password has been change for the next login.`);
        this.dialogRef.close();
      },
      error: (error)=>{
        console.log(error);
        this.matSnackBar.open(error.error.message);
      }
    })
  }

}

function formValidate(control: AbstractControl): null | ValidationErrors{
  console.log(control.get('newPassword').value);
  
  return control.get('newPassword').value === control.get('confirmPassword').value ? null : { confirmPassword: true }
  // if(control.get('newPassword').value === control.get('confirmPassword').value){
  //   return { confirmPassword: true }
  // }
  // return null
}
