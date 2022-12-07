import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-setup-topup-rate-all',
  templateUrl: './setup-topup-rate-all.component.html',
  styleUrls: ['./setup-topup-rate-all.component.scss']
})
export class SetupTopupRateAllComponent implements OnInit {

  formData: any = [];
  defaultDatas: any[] = [];

  constructor(
    private tourService: TourService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tourService.getTourTopupRates().subscribe({
      next: (response) => {
        console.log(response);
        if (response.length > 0) {
          this.defaultDatas = response;
          this.formData = response;
        }
      },
      error: (()=>{
        
      })
    })
  }

  onFormChange(value: any[]) {
    console.log(value)
    this.formData = value;
  }

  onSaveAll() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        content: `Confirm save`
      }
    }).afterClosed().subscribe({
      next: (answer) => {
        if (answer) {
          this.tourService.updateTourTopupRates(this.formData).subscribe({
            next: (response) => {
              console.log(response);
              this.ngOnInit();
              this.matSnackBar.open('Data updated.');
            }
          })
        }
      }
    })
  }





}
