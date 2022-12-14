import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/booking/booking.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-pre-booking-consent',
  templateUrl: './pre-booking-consent.component.html',
  styleUrls: [
    '../../login/login/login.component.scss',
    './pre-booking-consent.component.scss'
  ]
})
export class PreBookingConsentComponent implements OnInit {
  token: string;
  code: UntypedFormControl;
  accept: UntypedFormControl;
  isTokenValid: boolean = false;
  isSuccess: boolean = false;
  visitor: any;
  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private router: Router,
    private bookingService: BookingService,
    private matSnackBar: MatSnackBar
  ) {
    this.code = new UntypedFormControl('', [Validators.required])
    this.accept = new UntypedFormControl(false, [Validators.requiredTrue])

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.token) {
        this.token = params.token;
      }
    })
  }

  submit() {
    console.log(this.code.value);
    this.registerService.getPersonalConsent(this.token, this.code.value).subscribe({
      next: (response) => {
        // console.log(response);
        this.visitor = response;
        this.isTokenValid = true;
      },
      error: (error) => {
        this.matSnackBar.open(error.error.message);
      }
    });

  }

  success() {
    this.bookingService.bookingVisitorConfirm(null, this.visitor.consentId).subscribe({
      next: () => {
        this.isSuccess = true;
      },
      error:(error)=>{
        this.matSnackBar.open(error.error.message);
      }
    });
  }

  viewTerm() {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/term-condition`])
    );
    window.open(url, '_blank');
  }

}
