import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { MonthViewDay } from 'calendar-utils';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { TourService } from '../../tour/tour.service';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  dayTitle: string = moment(new Date).format('DD/MM/YYYY');

  viewDate: Date;
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];
  currentPeriod:any;
  currentTourID: any;
  refresh: Subject<any> = new Subject();
  selected: boolean = false;

  tourList:any[] = [];

  form: UntypedFormGroup;
  cancelable;

  constructor(
    private inventoryService: InventoryService,
    private tourService: TourService,
    private matSnackbar: MatSnackBar
  ) {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(),
      startDate: new UntypedFormControl(),
      endDate: new UntypedFormControl(),
      adultRate: new UntypedFormControl([],[Validators.required]),
      childRate: new UntypedFormControl([],[Validators.required]),
      cancelable: new UntypedFormControl(false),
      cancelBefore: new UntypedFormControl(),
      tourDate: new UntypedFormControl(),
      total: new UntypedFormControl([],[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.viewDate = new Date();
    
    for (let i = 0; i <= 5; i++) {
      // this.events.push({
      //   id: 1,
      //   start: new Date('2/6/2022'),
      //   end: new Date('2/8/2022'),
      //   title: 'โปรแกรมทัวร์ “กรุงเทพฯ (1 วัน)',
      // });

      
      // this.dataSource.data.push({
        //   code: `TICKETCODE${i}`,
        //   eventName: 'โปรแกรมทัวร์ “กรุงเทพฯ (1 วัน)',
        //   contactName: 'somchai boonrod',
        //   email: 'somchai@tour.com',
        //   status: 'Reserves',
        //   action: ''
        // })
      }
      this.tourService.getTours({}).subscribe((response)=>{
        if(response.datas[0]){
          console.log(response.datas[0]);
          this.getSchedule({value: response.datas[0].id});
        }
        this.tourList = response.datas;
      })

      if(this.form.get('cancelable').value){
        this.form.get('cancelBefore').enable();
      }else{
        this.form.get('cancelBefore').disable();
      }
      this.form.get('cancelable').valueChanges.subscribe((value)=>{
        if(value){
          this.form.get('cancelBefore').enable();
        }else{
          this.form.get('cancelBefore').disable();
        }
      })
      
  }

  setCurrentMonth(event){
    console.log(event);
    this.currentPeriod = event.period;
  }

  getSchedule(event: MatOption|any){
      console.log(event);
      this.currentTourID = event.value;
      this.events = [];
      this.inventoryService.getInventories(
        event.value,
        moment(this.currentPeriod.start).format('YYYY-MM-DD'),
        moment(this.currentPeriod.end).format('YYYY-MM-DD')
        ).subscribe((response)=>{
        console.log(response);
        Array.from(response).forEach((tour: any)=>{
              this.events.push({
                id: tour.id,
                start: new Date(tour.tourDate),
                end: new Date(tour.tourDate),
                title: '',
                ...tour,
                tourDate: new Date(tour.tourDate),
              });
        })
        this.refresh.next('');
        // this.events = response;
      });
  }

  changeDatePicker(): any {
    this.form.get('startDate').setValue(moment(this.form.get('startDate').value).format('YYYY-MM-DD'))
    this.form.get('endDate').setValue(moment(this.form.get('endDate').value).format('YYYY-MM-DD'));
  }

  eventClicked(value: any) {
    console.log(value);
    const v = value;
    let data = v;
    this.selected = true;
    // data.tourDate = moment(v.tourDate).format('YYYY-MM-DD');
    if(typeof v.cancelable === 'string'){
      data.cancelable = v.cancelable === 'Y' ? true:false;
    }
    if(data.cancelable){
      this.form.get('cancelBefore').enable();
    }else{
      this.form.get('cancelBefore').disable();
    }
    this.form.patchValue(data);
    this.form.get('startDate').disable();
    this.form.get('endDate').disable();
    // this.form.get('tourDate').disable();
    // this.dayTitle = moment(value.day.date).format('DD/MM/YYYY');
  }

  create(){
    let data = this.form.value;
    data.cancelable = data.cancelable ? 'Y':'N';
    this.inventoryService.createInventory(this.currentTourID, data).subscribe((response)=>{
      this.matSnackbar.open('Inventory created');
      this.getSchedule({ value: this.currentTourID });
    })
  }
  
  update(){
    let data = this.form.value;
    data.cancelable = data.cancelable ? 'Y':'N';
    this.inventoryService.updateInventory(this.currentTourID, data).subscribe((response)=>{
      this.matSnackbar.open('Inventory Updated');
      this.selected = false;
      this.getSchedule({ value: this.currentTourID });
      this.refresh.next('');
    })
  }

  cancel(){
    this.form.reset();
    this.form.get('startDate').enable();
    this.form.get('endDate').enable();
    this.selected = false;
  }

}
