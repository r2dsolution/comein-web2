import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TourService } from '../tour.service';
import { SharedService } from '../../shared/shared.service';
import { groupBy } from 'rxjs';
import * as moment from 'moment';

export type ChartOptions = {
  // plotOptions: ApexPlotOptions;
  series: ApexAxisChartSeries;
  labels: string[];
  chart: ApexChart;
  legend: ApexLegend;
  // lastUpdateFeed: Date;
  // lastUpdateUnMatch: Date;
  // colors: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  // title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-tour-dashboard',
  templateUrl: './tour-dashboard.component.html',
  styleUrls: ['./tour-dashboard.component.scss']
})
export class TourDashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  displayedColumns: string[] = [
    'bookindId',
    'refName',
    'total',
    'status',
    'location'
  ];

  tourCompanyId;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  dataSource = new MatTableDataSource();

  constructor(
    private tourService: TourService,
    private sharedService: SharedService
  ) {
    this.dashboardForm = new FormGroup({
      date: new FormControl(moment(new Date()).toDate())
    });
    this.sharedService.getUserInfo().subscribe({
      next: (info) => {
        // console.log()
        this.tourCompanyId = info.tourId;
        this.getDashboard(
          new Date
        );
      }
    });
    this.dashboardForm.get('date').valueChanges.subscribe({
      next: (value) => {
        this.getDashboard(
          value
        );
      }
    })
  }

  ngOnInit(): void {
    this.setChart([]);
  }

  getDashboard(dateFrom) {
    this.tourService.getTourBookingDashboard(
      this.tourCompanyId,
      moment(dateFrom).format('YYYY-MM-DD'),
      moment(dateFrom).add(5, 'days').format('YYYY-MM-DD')
    ).subscribe({
      next: (response) => {
        // console.log(response);
        let mockData = [
          {
            "total_cancel": 1,
            "tour_name": "Sun and Sea 0",
            "tour_company_id": 1,
            "total_visitor": 20,
            "tour_date": "2022-08-01",
            "total_booking": 44,
            "total_confirm": 43,
            "total_available": 26
          },
          {
            "total_cancel": 1,
            "tour_name": "Sun and Sea 1",
            "tour_company_id": 1,
            "total_visitor": 70,
            "tour_date": "2022-08-01",
            "total_booking": 44,
            "total_confirm": 43,
            "total_available": 26
          },
          {
            "total_cancel": 1,
            "tour_name": "Sun and Sea 2",
            "tour_company_id": 1,
            "total_visitor": 70,
            "tour_date": "2022-08-02",
            "total_booking": 44,
            "total_confirm": 43,
            "total_available": 26
          },
          {
            "total_cancel": 1,
            "tour_name": "Sun and Sea 3",
            "tour_company_id": 1,
            "total_visitor": 70,
            "tour_date": "2022-08-02",
            "total_booking": 44,
            "total_confirm": 43,
            "total_available": 26
          },
          {
            "total_cancel": 1,
            "tour_name": "Sun and Sea 4",
            "tour_company_id": 1,
            "total_visitor": 10,
            "tour_date": "2022-08-02",
            "total_booking": 44,
            "total_confirm": 43,
            "total_available": 26
          }
        ];
        this.setChart(mockData);
      }
    })
  }


  setChart(data: any[]) {


    // let categories = data.map((d)=> moment(d.tour_date, 'YYYY-MM-DD').format('DD/MM'));
    let categories = [...new Set(data.map((d) => moment(d.tour_date, 'YYYY-MM-DD').format('DD/MM')))];

    // let newObj: any = {};
    // data.forEach((d: any) => {
    //   if (!newObj[d.tour_date]) {
    //     newObj[d.tour_date] = [];
    //   }
    //   newObj[d.tour_date].push(d);
    // });

    let series = [];
    // Object.keys(newObj).forEach((key)=>{
    //   series.push({
    //     name: key,
    //     data: newObj[key]
    //   })
    // })


    // data = [
    //   {
    //     name: "Tourname 1",
    //     date: [
    //       {
    //         data: "วันที่ 1",
    //         visitor: 80,
    //         booking: 100
    //       },
    //       {
    //         data: "วันที่ 1",
    //         visitor: 80,
    //         booking: 100
    //       }
    //     ]
    //   }
    // ]

    // console.log(newObj);
    this.chartOptions = {
      series: [
        {
          name: "Tour 1",
          data: [10, 20]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        events: {
          dataPointSelection: ((event, chartContext, config) => {
            console.log(config.w.config.xaxis.categories[config.dataPointIndex]);
            console.log(config.w.config.series[config.seriesIndex].data[config.dataPointIndex]);
          })
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            position: 'center'
          }
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '13px',
          fontWeight: 900
        }
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    };
  }

}
