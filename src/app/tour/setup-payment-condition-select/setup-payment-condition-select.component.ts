import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-payment-condition-select',
  templateUrl: './setup-payment-condition-select.component.html',
  styleUrls: ['./setup-payment-condition-select.component.scss']
})
export class SetupPaymentConditionSelectComponent implements OnInit {

  isUseDefault: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
