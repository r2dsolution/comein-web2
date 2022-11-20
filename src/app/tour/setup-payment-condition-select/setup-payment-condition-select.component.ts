import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TourAdminService } from 'src/app/tour-admin/tour-admin.service';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-setup-payment-condition-select',
  templateUrl: './setup-payment-condition-select.component.html',
  styleUrls: ['./setup-payment-condition-select.component.scss']
})
export class SetupPaymentConditionSelectComponent implements OnInit {

  form: UntypedFormGroup;
  isUseDefault: boolean = true;
  tourList: any[] = [];
  constructor(
    private tourService: TourService,
    private tourAdminService: TourAdminService,
    private matSnackBar: MatSnackBar
  ) {
    this.form = new UntypedFormGroup({
      payableTourDay: new UntypedFormControl(0),
      payableDay: new UntypedFormControl(0),
      companyId: new UntypedFormControl(0),
      useDefault: new UntypedFormControl(false)
    })
  }

  ngOnInit(): void {
    this.tourAdminService.getTourAdmins({size: 999}).subscribe({
      next: (response) => {
        console.log(response);
        this.tourList = response.datas;
        this.form.get('companyId').setValue(response.datas[0].id);
        this.onSelectTour({value: response.datas[0].id});
      }
    })
  }

  onSelectTour(event) {
    this.tourService.getTourPaymentCondition(event.value).subscribe({
      next: (response) => {
        this.form.patchValue(response);
      }
    })
  }

  onSave(){
    // console.log(this.form.value);
    let data = this.form.value;
    this.tourService.updateTourPaymentCondition(data).subscribe({
      next: (response)=>{
        console.log(response);
        this.matSnackBar.open('Data updated.');
        this.onSelectTour({value:this.form.get('companyId').value});
      }
    })
  }


}
