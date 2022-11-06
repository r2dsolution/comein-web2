import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  searchForm: FormGroup;

  displayedColumns: string[] = [
    'bookindId',
    'refName',
    'tourDate',
    'total'
  ];

  // series: any[] = [5000.45, 25000];


  dataSource = new MatTableDataSource();

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  tourCompanyId: any;


  constructor(
    private sharedService: SharedService,
    private tourService: TourService
  ) {
    this.searchForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),

    })
  }

  ngOnInit(): void {

    this.sharedService.getUserInfo().subscribe({
      next: (info) => {
        // console.log()
        this.tourCompanyId = info.tourId;
        this.getDashboard(
          moment(new Date()).format('YYYY-MM-DD'),
          moment(new Date()).add(5, 'days').format('YYYY-MM-DD')
        );
      }
    });
  }

  getDashboard(dateForm, dateTo){
    this.setChart(['test'],[1000]);
    // this.tourService.getTourPaymentDashboard(this.tourCompanyId,dateForm, dateTo).subscribe((response)=>{
    //   console.log(response);
    // })
  }

  setChart(labels: string[], series: number[]){
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
