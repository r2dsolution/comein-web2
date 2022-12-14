import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { TourService } from 'src/app/tour/tour.service';
import { TourBookingService } from '../tour-booking.service';

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
  selector: 'app-tour-booking-dashboard',
  templateUrl: './tour-booking-dashboard.component.html',
  styleUrls: ['./tour-booking-dashboard.component.scss']
})
export class TourBookingDashboardComponent implements OnInit {


  searchForm: UntypedFormGroup;

  displayedColumns: string[] = [
    'bookindId',
    'refName',
    'tourDate',
    'tourName',
    'total',
    'status'
  ];

  // series: any[] = [5000.45, 25000];


  dataSource = new MatTableDataSource();

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  tourList: any;
  allTourBySearch: any[];
  totalSellValue: number = 0;
  tourSellValue: number = 0;

  constructor(
    private tourBookingService: TourBookingService,
    private tourService: TourService
  ) {
    this.searchForm = new UntypedFormGroup({
      startDate: new UntypedFormControl(moment(new Date()).subtract(180, 'days').toDate()),
      endDate: new UntypedFormControl(moment(new Date()).toDate()),

    })
  }

  ngOnInit(): void {
    this.getTourBookingDashboard();
  }

  getTourBookingDashboard(dateForm = this.searchForm.get('startDate').value, dateTo = this.searchForm.get('endDate').value) {
    this.tourBookingService.getTourBookingDashboard(moment(dateForm).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD')).subscribe((response) => {
      this.allTourBySearch = response;
      this.totalSellValue = 0;
      response.forEach((a) => {
        this.totalSellValue += a.total_sell_value;
      });
      ;
      this.setChart(
        response.map((r) => r.company_name),
        response.map((r) => r.total_sell_value)
      );
    })
  }
  
  
  onSelectCompany(event){
    this.tourSellValue = event.value.total_sell_value;
    this.tourBookingService.getTourbookingDashboardDetail(event.value.company_id,moment(this.searchForm.get('startDate').value).format('YYYY-MM-DD'), moment(this.searchForm.get('endDate').value).format('YYYY-MM-DD')).subscribe({
      next: (response)=>{
        this.dataSource.data = response;
      },
      error: ()=>{
        this.dataSource.data = [];        
      }
    })
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
    setTimeout(()=>{
      if(
        moment(this.searchForm.value.startDate).isValid() &&
        moment(this.searchForm.value.endDate).isValid()
        ){
        console.log(this.searchForm.value.startDate);
        console.log(this.searchForm.value.endDate);
        this.getTourBookingDashboard();
      }
    }, 500);
  }

}
