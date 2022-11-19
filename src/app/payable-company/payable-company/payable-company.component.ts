import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TourAdminService } from 'src/app/tour-admin/tour-admin.service';
import { PayableCompanyService } from '../payable-company.service';

@Component({
  selector: 'app-payable-company',
  templateUrl: './payable-company.component.html',
  styleUrls: ['./payable-company.component.scss']
})
export class PayableCompanyComponent implements OnInit {

  tourList: any[] = [];
  dataTable: any[] = [];
  companyId;
  noteInput: FormControl;
  constructor(
    private payableService: PayableCompanyService,
    private tourAdminService: TourAdminService,
    private matDialog: MatDialog,
    private matSnackBae: MatSnackBar
  ) {
    this.noteInput = new FormControl('');
  }

  ngOnInit(): void {
    this.tourAdminService.getTourAdmins({}).subscribe({
      next: (response) => {
        console.log(response);
        this.tourList = response.datas;
        // this.form.get('companyId').setValue(response.datas[0].id);
        // this.onSelectTour({value: response.datas[0].id});
      }
    })
  }

  onSelectTour(event){
    this.companyId = event.value;
    this.payableService.getPayableCompany(event.value).subscribe({
      next: (response)=>{
        this.dataTable = response;
      }
    })
  }

  onPay(){
    this.matDialog.open(ConfirmDialogComponent,{
      data:{
        content: 'Confirm to pay'
      }
    }).afterClosed().subscribe({
      next:(answer)=>{
        if(answer && this.companyId){
          this.payableService.payToCompany(this.companyId,{
            period: this.dataTable[0].periodId,
            note: this.noteInput.value
          }).subscribe(()=>{
            this.matSnackBae.open('Pay success');
          })
        }
      }
    })
  }

}
