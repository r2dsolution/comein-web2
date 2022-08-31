import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';
import { MonthViewDay } from 'calendar-utils';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  dayTitle: string = moment(new Date).format('DD/MM/YYYY');

  viewDate: Date;
  events: CalendarEvent[] = [];
  displayedColumns: string[] = [
    'code',
    'eventName',
    'contactName',
    'email',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit(): void {
    this.viewDate = new Date();

    
    for( let i = 0; i<=5; i++){
      this.events.push({
        id:1,
        start: new Date('2/6/2022'),
        end: new Date('2/8/2022'),
        title: 'โปรแกรมทัวร์ “กรุงเทพฯ (1 วัน)',
      });

      this.dataSource.data.push({
        code: `TICKETCODE${i}`,
        eventName: 'โปรแกรมทัวร์ “กรุงเทพฯ (1 วัน)',
        contactName: 'somchai boonrod',
        email: 'somchai@tour.com',
        status: 'Reserves',
        action: ''
      })
    }
  }

  dayClicked(value: { day: MonthViewDay}) {
    console.log(value);
    this.dayTitle = moment(value.day.date).format('DD/MM/YYYY');
  }

}
