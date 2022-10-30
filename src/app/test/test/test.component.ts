import { Component, OnInit } from '@angular/core';
// import { CalendarEvent } from 'angular-calendar';
import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
