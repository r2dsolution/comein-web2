import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { OtaRematchDialogComponent } from 'src/app/ota/ota-rematch-dialog/ota-rematch-dialog.component';
import { OtaService } from '../ota.service';

export type ChartOptions = {
  // plotOptions: ApexPlotOptions;
  series: ApexNonAxisChartSeries;
  labels: string[];
  chart: ApexChart;
  legend: ApexLegend;
  lastUpdateFeed: Date;
  lastUpdateUnMatch: Date;
  colors: string[];

  // xaxis: ApexXAxis;
  // title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-ota',
  templateUrl: './ota.component.html',
  styleUrls: ['./ota.component.scss']
})
export class OtaComponent implements OnInit {
  // paginator: MatPaginator;
  paginator: any = {};

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  form: FormGroup;
  displayedColumns = [
    'index',
    'feedDate',
    'bookNo',
    'bookDate',
    'otaName',
    'statusMatch',
    'isCancel'
  ];


  constructor(
    private otaService: OtaService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = new FormGroup({
      startDate: new FormControl(moment(new Date(),).subtract(31, 'days').toDate()),
      endDate: new FormControl(moment(new Date(),).add(1, 'day').toDate())
    });

    this.paginator.length = 0;
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;



    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      legend: {
        show: false
      },
      series: [0, 0],
      labels: ['Matched', 'Not matched'],
      lastUpdateFeed: new Date(),
      lastUpdateUnMatch: new Date(),
      colors: ['#45ad31', '#e04c4c']
    };

  }

  ngOnInit(): void {
    this.getList();
    this.getDashboard();
  }
  
  onFilter() {
    this.getList();
    this.getDashboard();
    this.changeDatePicker();
  }

  getDashboard() {
    this.otaService.getOtaDashboard(this.form.get('startDate').value, this.form.get('endDate').value).subscribe((response) => {
      console.log(response);
      this.chartOptions.series = [response.total_feed, response.total_unmatch];
      this.chartOptions.lastUpdateFeed = new Date(response.last_updated_feed);
      this.chartOptions.lastUpdateUnMatch = new Date(response.last_updated_unmatch);
    });
  }

  getList(page = 0) {
    let value = this.form.value;
    if (!moment(value.startDate).isValid()) { value.startDate = null }
    if (!moment(value.endDate).isValid()) { value.endDate = null }
    this.otaService.getOtaFeed(page, this.paginator.pageSize, value.startDate, value.endDate).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource.data = response.datas;
        this.paginator.length = response.pagging.total;
        // this.paginator.pageSize = response.pagging.pageSize;
        this.paginator.pageIndex = response.pagging.pageNumber;
      }
    })
  }


  onRowClick(ota) {
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

  onSetPage(event: PageEvent) {
    this.paginator.pageSize = event.pageSize;
    this.getList(event.pageIndex);
  }

  changeDatePicker(): void {
    this.form.get('startDate').setValue(moment(this.form.get('startDate').value).format('YYYY-MM-DD'))
    this.form.get('endDate').setValue(moment(this.form.get('endDate').value).format('YYYY-MM-DD'));
  }

}
