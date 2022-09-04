import { Component, OnInit } from '@angular/core';
// import { CalendarEvent } from 'angular-calendar';
import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  viewDate: Date;
  // events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit(): void {
    // this.viewDate = new Date();


    // for( let i = 0; i<=5; i++){
    //   this.events.push({
    //     id:1,
    //     start: new Date('2/6/2022'),
    //     end: new Date('2/8/2022'),
    //     title: 'Event 1',
    //   });
    // }

  }

  dayClicked(value){
    console.log(value);
  }

  uploadImage(event){
    console.log(event.target.files);
    const file = event.target.files;
    Storage.put('test.jpg', file,{
      bucket: 'comein-images/tour',
      acl: 'public-read',
    })
  }

}
