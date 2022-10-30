import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-topup-rate-all',
  templateUrl: './setup-topup-rate-all.component.html',
  styleUrls: ['./setup-topup-rate-all.component.scss']
})
export class SetupTopupRateAllComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {

  }

  onFormChange(value){
    console.log(value)
  }

  

}
