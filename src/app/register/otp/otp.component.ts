import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticDialogComponent } from '../../shared/notic-dialog/notic-dialog.component';
import { Auth } from 'aws-amplify';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, interval, Observable, PartialObserver, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: [
    './otp.component.scss',
    '../../login/login/login.component.scss'
  ]
})
export class OtpComponent implements OnInit {
  loginForm: FormGroup;
  isConfirm: boolean = false;
  usr: string = null;
  ispause = new Subject();
  time = 0;
  timer: Observable<number>;
  timerObserver: PartialObserver<number>;
  userSub: any;

  constructor(
    private matSnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      otp: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.usr = params.usr;
      this.userSub = params.userSub;
    });

    this.timer = interval(1000)
      .pipe(
        takeUntil(this.ispause)
      );

    this.timerObserver = {

      next: (_: number) => {
        if (this.time == 0) { this.ispause.next; }
        this.time -= 1;
      }
    };
  }

  resendOTP() {
    if(this.userSub){
      Auth.resendSignUp(this.userSub);
      this.matSnackBar.open('New OTP has been send to your email.');
      this.time = 30;
      this.timer.subscribe(this.timerObserver);
    }else{
      this.matSnackBar.open('Unknown username.');
    }
  }

  confirmOTP() {
    // this.isConfirm = true;
    const bytes = CryptoJS.AES.decrypt(this.usr, environment.cryptr);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    Auth.confirmSignUp(decryptedData, this.loginForm.get('otp').value).then((response) => {
      this.matDialog.open(NoticDialogComponent).afterClosed().subscribe((response) => {
        console.log(response);
        this.router.navigate(['login']);
      })
    }).catch((error) => {
      this.matSnackBar.open(`${error.message}`, 'close', { duration: 3000 });
    })
  }

  secondsToHms(d) {
    d = Number(d);
    // var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    // var mDisplay = m > 0 ? m + (m == 1 ? ": " : " : ") : "00";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "00";
    return `${sDisplay}s`;
  }

}
