import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TourAdminService } from 'src/app/tour-admin/tour-admin.service';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-setup-topup-rate-select',
  templateUrl: './setup-topup-rate-select.component.html',
  styleUrls: ['./setup-topup-rate-select.component.scss']
})
export class SetupTopupRateSelectComponent implements OnInit {

  isUseDefault: boolean = true;
  companyId;
  tourList: any[] = [];
  defaultDatas: any[] = [];
  detail: any[] = [];

  constructor(
    private tourService: TourService,
    private tourAdminService: TourAdminService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tourAdminService.getTourAdmins({ size: 999 }).subscribe({
      next: (response) => {
        console.log(response);
        this.tourList = response.datas;
        this.companyId = response.datas[0].id;
        this.onSelectTour({ value: response.datas[0].id });
      },
      error: (()=>{
        
      })
    })
  }

  onFormChange(value) {
    console.log(value)
    this.detail = value;
  }

  onSelectTour(event) {
    this.tourService.getTourTopupRate(event.value).subscribe({
      next: (response) => {
        console.log(response.useDefault);
        this.isUseDefault = response.useDefault;
        this.defaultDatas = response.detail;
        this.detail = response.detail;
        this.companyId = event.value;
      },
      error: (()=>{

      })
    })
  }

  onSaveAll() {
    // console.log(this.form.value);
    let data = {
      useDefault: this.isUseDefault,
      detail: this.detail,
      companyId: this.companyId
    };
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        content: 'Confirm to save'
      }
    }).afterClosed().subscribe({
      next: (answer) => {
        if (answer) {
          this.tourService.updateTourTopupRate(data, this.companyId).subscribe({
            next: (response) => {
              console.log(response);
              this.matSnackBar.open('Data updated.');
              this.onSelectTour({ value: this.companyId});
            }
          })
        }
      },
      error: (error)=>{
        this.matSnackBar.open(error.error.message);
      }
    })
  }

}
