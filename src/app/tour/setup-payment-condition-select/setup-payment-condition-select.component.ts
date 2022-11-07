import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-setup-payment-condition-select',
  templateUrl: './setup-payment-condition-select.component.html',
  styleUrls: ['./setup-payment-condition-select.component.scss']
})
export class SetupPaymentConditionSelectComponent implements OnInit {

  form: FormGroup;
  isUseDefault: boolean = true;
  tourList: any[] = [];
  constructor(
    private tourService: TourService,
    private matSnackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      payableTourDate: new FormControl(0),
      payableDate: new FormControl(0),
      companyId: new FormControl(0),
      useDefault: new FormControl(false)
    })
  }

  ngOnInit(): void {
    this.tourService.getTours({}).subscribe({
      next: (response) => {
        console.log(response);
        this.tourList = response.datas;
      }
    })
  }

  onSelectTour(event) {
    this.form.patchValue({
      "payableTourDate": 3,
      "payableDate": 0,
      "companyId": event.value,
      "useDefault": false
    })
    // this.tourService.getTourPaymentCondition(event.value).subscribe({
    //   next: (response) => {
    //     // Mock


    //   }
    // })
  }

  onSave(){
    console.log(this.form.value);
    this.tourService.updateTourPaymentCondition(this.form.value).subscribe({
      next: (response)=>{
        console.log(response);
        this.matSnackBar.open('Data updated.');
      }
    })
  }


}
