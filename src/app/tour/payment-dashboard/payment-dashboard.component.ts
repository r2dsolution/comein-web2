import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.scss']
})
export class PaymentDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'bookindId',
    'refName',
    'tourDate',
    'total'
  ];

  series: any[] = [5000.45, 25000];


  dataSource = new MatTableDataSource();

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor() { }

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
                label: `${new Intl.NumberFormat().format(Number(Array.from(this.series).reduce((a:number, b:number) => a + b, 0)))}`,
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
        text: "Favourite Movie Type"
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

}
