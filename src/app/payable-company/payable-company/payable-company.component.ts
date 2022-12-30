import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TourAdminService } from 'src/app/tour-admin/tour-admin.service';
import { PayableCompanyService } from '../payable-company.service';

@Component({
  selector: 'app-payable-company',
  templateUrl: './payable-company.component.html',
  styleUrls: ['./payable-company.component.scss']
})
export class PayableCompanyComponent implements OnInit {

  displayedColumns: string[] = [
    'bookingCode',
    'tourName',
    'tourDate',
    'netValue'
  ];

  tourList: any[] = [];
  dataTable: any[] = [];
  dataTableTemp: any[] = [];
  
  companyId;
  status: string = '';
  noteInput: UntypedFormControl;

  // summary = 0;
  constructor(
    private payableService: PayableCompanyService,
    private tourAdminService: TourAdminService,
    private matDialog: MatDialog,
    private matSnackBae: MatSnackBar
  ) {
    this.noteInput = new UntypedFormControl('');
  }

  ngOnInit(): void {
    this.tourAdminService.getTourAdmins({}).subscribe({
      next: (response) => {
        console.log(response);
        this.tourList = response.datas;
        // this.form.get('companyId').setValue(response.datas[0].id);
        // this.onSelectTour({value: response.datas[0].id});
      },
      error:(error)=>{
        this.tourList = [];
        this.matSnackBae.open(error.error.message);
      }
    })
  }

  onSelectTour(event) {
    this.companyId = event.value;
    this.payableService.getPayableCompany(event.value).pipe(
      map((res)=>{
        return res.map((d)=> {d.note = ""; return d;} );
      })
    ).subscribe({
      next: (response) => {
        // console.log(response);
        this.status = "";
        this.dataTable = this.dataTableTemp = response;
        
        // this.summary = response.map((r)=> parseFloat(r.netValue)).reduce((a,b) => a+b);
      },
      error:(error)=>{
        this.dataTable  = this.dataTableTemp = [];
        this.matSnackBae.open(error.error.message);
      }
    })
  }

  onStatusChange(event){
    console.log(event.value);
    this.status = event.value;

    if(this.status){
      this.dataTable = this.dataTableTemp.filter((d)=> d.status === this.status);
    }else{
      this.dataTable = this.dataTableTemp;
    }
  }

  onPay(data) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        content: 'Confirm to pay'
      }
    }).afterClosed().subscribe({
      next: (answer) => {
        if (answer && this.companyId) {
          this.payableService.payToCompany(this.companyId, {
            periodId: data.periodId,
            note: data.note
          }).subscribe(() => {
            this.matSnackBae.open('Pay success');
            this.onSelectTour({ value: this.companyId })
          })
        }
      },
      error: (error) => {
        console.log(error);
        this.matSnackBae.open(error.error.message);
      }
    })
  }

}
