import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-setup-topup-rate-form',
  templateUrl: './setup-topup-rate-form.component.html',
  styleUrls: ['./setup-topup-rate-form.component.scss']
})
export class SetupTopupRateFormComponent implements OnInit {

  @Input('defaultDatas') defaultDatas: any[];
  @Output() onFormChange = new EventEmitter();

  datas: any[] = [];
  tempData: any = null;
  addData: any = {
    min: 0,
    max: 0,
    rate: 0,
    comein: 0,
    hotel: 0,
    isEdit: false
  };
  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    // console.log(this.addData);
    this.datas.push(JSON.parse(JSON.stringify(this.addData)));
    this.onFormChange.emit(this.datas);
  }

  onEdit(index) {
    this.datas.map((d, i) => {
      if (index === i) {
        console.log(i);
        d.isEdit = true;
      } else {
        console.log(i);
        d.isEdit = false;
      }
      return d;
    });
    this.tempData = JSON.parse(JSON.stringify(this.datas[index]));
  }
  onSave(index) {
    this.datas[index] = JSON.parse(JSON.stringify(this.tempData));
    this.datas[index].isEdit = false;
    this.onFormChange.emit(this.datas);
    this.tempData = null;
  }
  onCancel(index) {
    this.datas[index].isEdit = false;
    this.tempData = null;
  }

}
