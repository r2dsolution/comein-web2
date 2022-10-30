import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-topup-rate-select',
  templateUrl: './setup-topup-rate-select.component.html',
  styleUrls: ['./setup-topup-rate-select.component.scss']
})
export class SetupTopupRateSelectComponent implements OnInit {

  isUseDefault: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onFormChange(value) {
    console.log(value)
  }

}
