import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-setup-payment-condition-all',
  templateUrl: './setup-payment-condition-all.component.html',
  styleUrls: ['./setup-payment-condition-all.component.scss']
})
export class SetupPaymentConditionAllComponent implements OnInit {
  // conditions;
  form: UntypedFormGroup;
  constructor(
    private tourService: TourService,
    private matSnackBar: MatSnackBar
  ) {
    this.form = new UntypedFormGroup({
      payableTourDay: new UntypedFormControl(0),
      payableDay: new UntypedFormControl(0)
    })
  }

  ngOnInit(): void {
    this.tourService.getTourPaymentConditions().subscribe((response)=>{
      this.form.patchValue(response);
    });
  }

  onSave(){
    this.tourService.updateTourPaymentConditions(this.form.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.matSnackBar.open('Data updated.');
      }
    })
  }

}
