import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { SharedService } from 'src/app/shared/shared.service';
import { TourService } from '../tour.service';

export type ChartOptions = {

  chart: ApexChart;
  series: ApexNonAxisChartSeries;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  labels: string[];
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  // lastUpdateFeed: Date;
  // lastUpdateUnMatch: Date;
  // colors: string[];
  // xaxis: ApexXAxis;
  // yaxis: ApexYAxis;
  // tooltip: ApexTooltip;
};

@Component({
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.scss']
})
export class PaymentDashboardComponent implements OnInit {

  searchForm: UntypedFormGroup;

  periods: any[] = [];

  displayedColumns: string[] = [
    'bookindId',
    'refName',
    'tourDate',
    'total'
  ];

  summaryNetValue = 0;

  // series: any[] = [5000.45, 25000];


  // dataSource = new MatTableDataSource();
  dataTable: any[] = [];
  periodId;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  tourCompanyId: any;


  constructor(
    private sharedService: SharedService,
    private tourService: TourService
  ) {
    this.searchForm = new UntypedFormGroup({
      startDate: new UntypedFormControl(),
      endDate: new UntypedFormControl(),

    })
  }

  ngOnInit(): void {

    this.sharedService.getUserInfo().subscribe({
      next: (info) => {
        // console.log()
        this.tourCompanyId = info.tourId;
        
        this.tourService.getTourPaymentDashboardPeriod(this.tourCompanyId).subscribe({
          next: (response) => {
            console.log(response);
            this.periods = response;
            this.getDashboard(response[0].period_id);
            this.periodId = response[0].period_id;
          }
        })
      }
    });
  }

  getDashboard(periodId) {
    this.periodId = periodId;
    this.tourService.getTourPaymentDashboard(this.tourCompanyId,periodId).subscribe((response)=>{
      console.log(response);
      this.dataTable = response;
      this.summaryNetValue = response.map((r)=> parseFloat(r.total_net_value)).reduce((a,b)=> a+b);
      this.setChart(
        response.map((r)=> r.tour_name), 
        response.map((r)=> r.total_net_value)
      );
    })
  }
  
  onTourClick(index) {
    if(!this.dataTable[index].booking){
      this.tourService.getTourPaymentDashboardDetail(this.dataTable[index].tour_id,this.periodId).subscribe((response)=>{
        console.log(response);
        this.dataTable[index].booking = response;
        // this.summaryNetValue = response.map((r)=> parseFloat(r.net_value)).reduce((a,b)=> a+b);
        // this.setChart(
        //   response.map((r)=> r.tour_name), 
        //   response.map((r)=> r.net_value)
        // );
      })
    }
  }

  

  onSelectPeriod(event){
    this.getDashboard(event.value)
    // console.log(event.value)
  }

  setChart(labels: string[], series: number[]) {
    this.chartOptions = {
      series: series,
      chart: {
        type: 'donut',
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                formatter(w) {
                  // console.log(w);
                  return `บาท`;
                },
                label: `${new Intl.NumberFormat().format(Number(Array.from(series).reduce((a: number, b: number) => a + b, 0)))}`,
                fontSize: '24px',
                showAlways: true
              }
            }
          }
        }
      },
      labels: labels,
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: ""
      },
      legend: {
        show: false
      }
    };
  }

  changeDatePicker(): any {
    this.searchForm.value.startDate = (moment(this.searchForm.value.startDate).format('YYYY-MM-DD'));
    this.searchForm.value.endDate = (moment(this.searchForm.value.endDate).format('YYYY-MM-DD'));
  }

}
