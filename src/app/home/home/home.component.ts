import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';
import { AuthService } from 'src/app/core/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  allPermissions: any[] = [];

  constructor(
    private ngxPermissionService: NgxPermissionsService,
    private matDoalog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // const permissions = this.ngxPermissionService.getPermissions();
    // console.log(permissions);
    this.allPermissions = Object.keys(this.ngxPermissionService.getPermissions())
  }

  openAlertDialog(){
    this.matDoalog.open(AlertDialogComponent,{
      data: {
        title: 'Alert',
        content: 'Simple Alert',
        button: 'OK'
      }
    });
  }
  openConfirmDialog(){
    this.matDoalog.open(ConfirmDialogComponent,{
      data: {
        title: 'Do you want to continue',
        content: '.....',
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer)=>{
      console.log(answer);
    });
  }

}
