import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Auth } from 'aws-amplify';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { RegisterService } from '../register.service';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: [
    '../../login/login/login.component.scss',
    './create-password.component.scss'
  ]
})
export class CreatePasswordComponent implements OnInit {
  loginForm: UntypedFormGroup;
  refNo: string;
  isConsent: boolean = true;
  userSub: string;
  name: string;
  firstName: string;
  lastName: string;


  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackbar: MatSnackBar,
    private registerService: RegisterService,
    private matDialog: MatDialog
  ) {
    this.auth.signOut();
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      accept: new UntypedFormControl(false, [Validators.required]),
    }, {
      validators: [checkPasswords]
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.consent) {
        this.isConsent = params.consent === 'true';

      }
      if (params.refNo) {
        this.refNo = params.refNo;
        this.registerService.getUserByRef(params.refNo).subscribe({
          next: (responsee) => {
            this.loginForm.get('username').setValue(responsee.email);
            this.name = `${responsee.firstName} ${responsee.lastName}`;
            this.firstName = responsee.firstName;
            this.lastName = responsee.lastName;
          },
          error: (error) => {
            this.matSnackbar.open(`Reference code is invalid.`, 'close', { duration: 3000 });
          }
        });
      } else {
        this.router.navigate(['register'], { replaceUrl: true });
      }
    });
  }

  createAccount() {
    // let phone: string = this.loginForm.get('phone').value;
    // let first = String(phone).replace(',','').split('')[0];
    // if(first === '0'){
    //   phone = `+66${phone.substring(1)}`;
    // }
    const formData = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    // Math.random().toString(36).slice(-8),
    const usr = CryptoJS.AES.encrypt(formData.username, environment.cryptr).toString();
    // const cryptr = new Cryptr(environment.cryptr);
    console.log(usr);
    // const bytes = CryptoJS.AES.decrypt(usr, environment.cryptr);
    // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(decryptedData);
    Auth.signUp(formData).then((response) => {
      // console.log(response.userSub);
      this.userSub = response.userSub;
      this.registerService.signUp(this.refNo, formData.username, response.userSub).subscribe((res) => {
        this.router.navigate(['register', 'otp'], { queryParams: { usr: usr, userSub: response.userSub } });
      });
    }).catch((error) => {
      this.matSnackbar.open(`${error.message}`, 'close', { duration: 3000 });
    });
  }

  // viewTerm() {
  //   this.matDialog.open(AlertDialogComponent, {
  //     width: '400px',
  //     data: {
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



export function checkPasswords(group: AbstractControl): ValidationErrors | null {
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassword').value
  return pass === confirmPass ? null : { notSame: true }
}