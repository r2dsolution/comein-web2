import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { OtaRematchDialogComponent } from 'src/app/ota/ota-rematch-dialog/ota-rematch-dialog.component';
import { OtaService } from '../ota.service';

@Component({
  selector: 'app-ota',
  templateUrl: './ota.component.html',
  styleUrls: ['./ota.component.scss']
})
export class OtaComponent implements OnInit {
  // paginator: MatPaginator;
  paginator: any = {};

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  form: FormGroup;
  displayedColumns = [
    'index',
    'feedDate',
    'bookNo',
    'bookDate',
    'otaName',
    'statusMatch'
  ];


  constructor(
    private otaService: OtaService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });

    this.paginator.length = 0;
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
  }

  ngOnInit(): void {
    this.getList();
  }

  onFilter(){
    this.getList();
    this.changeDatePicker();
    this.getList();
  }
  
  getList(page = 0) {
    let value = this.form.value;
    if(!moment(value.startDate).isValid()){ value.startDate = null }
    if(!moment(value.endDate).isValid()){ value.endDate = null }
    this.otaService.getOtaFeed(page, this.paginator.pageSize, value.startDate, value.endDate).subscribe({
    next: (response) => {
      this.dataSource.data = response.datas;
      console.log(response);
        this.paginator.length = response.pagging.total;
        // this.paginator.pageSize = response.pagging.pageSize;
        this.paginator.pageIndex = response.pagging.pageNumber;
      }
    })
  }


  onRowClick(ota){
    console.log(ota);
    this.router.navigate(['ota', ota.id, 'detail']);
    // if(ota.status === 'UnMatch'){
    //   this.matDialog.open(OtaRematchDialogComponent,{
    //     data: ota,
    //     width: '450px'
    //   }).afterClosed().subscribe((hotelId)=>{
    //     console.log(hotelId);
    //     if(hotelId){
    //       this.otaService.reMatch(ota.id, hotelId).subscribe((response)=>{
    //         this.matSnackBar.open('Re-Match complete.');
    //         this.getList(this.paginator.pageIndex);
    //       });
    //     }
    //   })
    // }
  }

  onSetPage(event: PageEvent){
    this.paginator.pageSize = event.pageSize;
    this.getList(event.pageIndex);
  }

  changeDatePicker(): void {
    this.form.get('startDate').setValue(moment(this.form.get('startDate').value).format('YYYY-MM-DD'))
    this.form.get('endDate').setValue(moment(this.form.get('endDate').value).format('YYYY-MM-DD'));
  }

}
