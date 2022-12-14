import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { OtaRematchDialogComponent } from '../ota-rematch-dialog/ota-rematch-dialog.component';
import { OtaService } from '../ota.service';

@Component({
  selector: 'app-ota-detail',
  templateUrl: './ota-detail.component.html',
  styleUrls: ['./ota-detail.component.scss']
})
export class OtaDetailComponent implements OnInit {

  ota: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private otaService: OtaService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.otaService.getOtaDetail(params.id).subscribe({
          next: (response) => {
            this.ota = response;
            // console.log(response);
          },
          error: (error) => {
            console.log(error);
            this.matSnackBar.open(error.error.message);
          }
          // ,
          // error: ()=>{
          //     this.ota ={

          //       "checkinDate": "2022-02-14",
          //       "checkoutDate": "2022-02-15",
          //       "email": "bbb@guest.booking.com",
          //       "contactNo": "+462035640788",
          //       "nationality": null,
          //       "roomNight": 1,
          //       "price": 5339.25,
          //       "adult": 5,
          //       "child": null,
          //       "remark": null,
          //       "hotelId": null
          //   }
          // }
        })
      }
    });
  }

  onRematch() {
    this.matDialog.open(OtaRematchDialogComponent, {
      data: this.ota,
      width: '450px'
    }).afterClosed().subscribe((hotelId) => {
      console.log(hotelId);
      if (hotelId) {
        this.otaService.reMatch(this.ota.id, hotelId, this.ota).subscribe({
          next: (response) => {
            this.matSnackBar.open('Re-Match has completed.');
            this.router.navigate(['ota']);
          },
          error: (error) => {
            console.log(error);
            this.matSnackBar.open(error.error.message);
          }
        });
      }
    })
  }

  onUnmatch() {
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: `Un-Match OTA ${this.ota.hotelName}`,
        content: `Do you want to continue ?`
      }
    }).afterClosed().subscribe((answer) => {
      if (answer) {
        this.otaService.reMatch(this.ota.id, null, this.ota).subscribe({
          next: (response) => {
            this.matSnackBar.open('Un-Match has completed.');
            this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
            this.matSnackBar.open(error.error.message);
          }
        });
      }
    })
  }

  back() {
    this.location.back();
  }

}
