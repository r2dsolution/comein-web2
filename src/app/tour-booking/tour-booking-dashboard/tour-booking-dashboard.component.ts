import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';

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

  
  searchForm: FormGroup;

  displayedColumns: string[] = [
    'bookindId',
    'refName',
    'tourDate',
    'tourName',
    'total',
    'status'
  ];

  series: any[] = [5000.45, 25000];


  dataSource = new MatTableDataSource();

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor() {
    this.searchForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),

    })
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.series,
      chart: {
        // width: 380,
        type: 'donut',
        // dropShadow: {
        //   enabled: true,
        //   color: '#111',
        //   top: -1,
        //   left: 3,
        //   blur: 3,
        //   opacity: 0.2
        // }
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
                label: `${new Intl.NumberFormat().format(Number(Array.from(this.series).reduce((a: number, b: number) => a + b, 0)))}`,
                fontSize: '24px',
                showAlways: true
              }
            }
          }
        }
      },
      labels: ["Sun and Sea", "The river side dinner"],
      dataLabels: {
        enabled: false
      },
      fill: {
        // type: 'pattern',
        opacity: 1,
        // pattern: {
        //   enabled: true,
        //   style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
        // },
      },
      // states: {
      //   hover: {
      //     filter: 'none'
      //   }
      // },
      // theme: {
      //   palette: 'palette2'
      // },
      title: {
        text: ""
      },
      legend: {
        show: false
      }
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200
      //       },
      //       legend: {
      //         position: 'bottom'
      //       }
      //     }
      //   }
      // ]
    };

  }

  changeDatePicker(): any {
    this.searchForm.value.startDate = (moment(this.searchForm.value.startDate).format('YYYY-MM-DD'));
    this.searchForm.value.endDate = (moment(this.searchForm.value.endDate).format('YYYY-MM-DD'));
  }

}
