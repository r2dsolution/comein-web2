import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { debounceTime, delay, Observable, of } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { MENUS } from '../shared/menu';
import { LoadingService } from '../../core/service/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/shared/change-password-dialog/change-password-dialog.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  isLoggedIn$: Observable<boolean>;
  isSelectedRole$: Observable<boolean>;
  menus = MENUS;
  isLoading: boolean = false;

  hotelName: string = "";
  userName: string = "";


  constructor(
    private authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private loadingService: LoadingService,
    private matDialog: MatDialog,
    private sharedService: SharedService

    // private translate: TranslateService,
    // private loadingService: LoadingService,
  ) {
    iconRegistry.addSvgIcon('th', sanitizer.bypassSecurityTrustResourceUrl('assets/images/multilingual_icons/thailand.svg'));
    iconRegistry.addSvgIcon('en', sanitizer.bypassSecurityTrustResourceUrl('assets/images/multilingual_icons/united-states-of-america.svg'));

    
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isSelectedRole$ = this.authService.isSelectedRole;
    this.authService.isLoggedIn.pipe(debounceTime(2000)).subscribe((response)=>{
      if(response){
        this.sharedService.getUserInfo().subscribe((response) => {
          this.hotelName = response.hotelName;
          this.userName = response.name;   
        });  
      }
    });

    this.loadingService.loading.pipe(delay(0)).subscribe((load)=>{
      this.isLoading = load;
    });
  }

  changeLanguage(code: any) {
    // this.translate.use(code).subscribe(() => { });
  }

  currentRole(roles: string[]): boolean{
    return roles.includes(this.authService.getRoleName());
  }

  close() {
    this.sidenav.close();
  }

  switchRole() {
    this.authService.removeRole();
  }

  onLogout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
    this.close();
  }

  onChangePassword(){
    this.matDialog.open(ChangePasswordDialogComponent,{
      width: "450px"
    })
  }

}
