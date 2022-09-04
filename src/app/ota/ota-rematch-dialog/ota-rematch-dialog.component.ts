import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelAdminService } from '../../hotel-admin/hotel-admin.service';

@Component({
  selector: 'app-ota-rematch-dialog',
  templateUrl: './ota-rematch-dialog.component.html',
  styleUrls: ['./ota-rematch-dialog.component.scss']
})
export class OtaRematchDialogComponent implements OnInit {
  ota: any;
  hotelInput: FormControl;
  hotels:any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private matDialogRef: MatDialogRef<OtaRematchDialogComponent>,
    private hotelAdminService: HotelAdminService
  ) {
    this.ota = this.data;
    this.hotelInput = new FormControl('')
    console.log(this.data);
  }

  ngOnInit(): void {
    this.hotelAdminService.getHotelAdmins({}).subscribe({
      next: (response)=>{
        this.hotels = response.datas;
      }
    })
  }

  onRematch(){
    this.matDialogRef.close(this.hotelInput.value);
  }



}
