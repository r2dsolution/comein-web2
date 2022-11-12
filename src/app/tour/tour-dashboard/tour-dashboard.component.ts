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
  currentToursOfDate:any = [];
  dates: any[] = [];
  allTours: any[] = [];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  dataSource = new MatTableDataSource();

  constructor(
    private tourService: TourService,
    private sharedService: SharedService
  ) {
    this.dashboardForm = new FormGroup({
      date: new FormControl(moment('01-08-2022','DD-MM-YYYY').toDate())
    });
    this.sharedService.getUserInfo().subscribe({
      next: (info) => {
        // console.log()
        this.tourCompanyId = info.tourId;
        this.getDashboard(
          moment('01-08-2022','DD-MM-YYYY').toDate()
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
        this.allTours = response;
        this.setChart(response);
      }
    })
  }

  onToggleDetail(index){
    if(this.currentToursOfDate[index].show){
      this.currentToursOfDate[index].show = false;
    }else{
      this.currentToursOfDate[index].show = true;
      if(Array.from(this.currentToursOfDate[index].data).length === 0){
        this.getTourDetail(index);
      }
    }
  }

  getTourDetail(index){
    this.tourService.getTourBookingDashboardDetail(this.currentToursOfDate[index].tour_company_id,this.currentToursOfDate[index].tour_date).subscribe({
      next: (response)=>{
        console.log(response);
      }
    })
  }

  onNextDay(){
    const nextDay = moment(this.currentToursOfDate[0].tour_date).add(1,'day').format('YYYY-MM-DD').toString();
    console.log(nextDay);
    if(this.dates.includes(nextDay)){
      console.log(nextDay);
      this.onChangeDateOfDetail(nextDay);
    }
  }
  
  onPreviousDay(){
    const previousDay = moment(this.currentToursOfDate[0].tour_date).subtract(1,'day').format('YYYY-MM-DD').toString();
    console.log(previousDay);
    if(this.dates.includes(previousDay)){
      console.log(previousDay);
      this.onChangeDateOfDetail(previousDay);
    }
  }

  onChangeDateOfDetail(date: string){
    this.currentToursOfDate = this.allTours.filter((t)=> t.tour_date === date).map((t)=>{  t.show = false; t.data = []; return t; });
  }




  setChart(data: any[]) {
    let categories: string[] = this.dates = [...new Set(data.map((d) => moment(d.tour_date, 'YYYY-MM-DD').format('YYYY-MM-DD')))];
    let tours = [...new Set(data.map((d)=> d.tour_name))];
    let dataByDateGroup = [];
    let dataByNameGroup = []
    categories.forEach((key)=>{
      dataByDateGroup[key] = data.filter((d) => {return d.tour_date === key });
    });
    tours.forEach((tour)=>{
      dataByNameGroup[tour] = data.filter((d) => {return d.tour_name === tour });
    });
    // this.tours = dataByNameGroup;
    let series = [];
    Object.entries(dataByNameGroup).forEach(([key, value])=>{
      console.log(key)
      series.push({
        name: key,
        data: value.map((v)=> v.total_visitor)
      });
    });

    this.onChangeDateOfDetail(this.dates[0]);

    this.chartOptions = {
      series: series,
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
        categories: [...new Set(categories.map((c)=>moment(c, 'YYYY-MM-DD').format('DD/MM')))],
      },
      yaxis: {
        title: {
          text: 'Total vistors'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return + val + " persons"
          }
        }
      }
    };
  }

}
