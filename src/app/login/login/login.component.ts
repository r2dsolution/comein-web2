import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Auth } from 'aws-amplify';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  key: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }

  ngOnInit(): void {
    // Auth.signOut({global: true});
    
  }

  signIn() {
    if(!this.loginForm.get('username').value || !this.loginForm.get('password').value){
      this.matSnackBar.open('Incorrect username or password.', 'close', { duration: 3000});
    }else{
      Auth.signIn(this.loginForm.get('username').value, this.loginForm.get('password').value).then((response) => {
        this.auth.setupAfterSignin(response);
      }).catch((error) => {
        this.matSnackBar.open(`${error.message}`, 'close', { duration: 3000});
      });
    }
  }

  // login() {
  //   this.auth.signIn(this.loginForm.get('username').value, this.loginForm.get('password').value, this.key).then((data) => {

  //   }).catch(() => {
  //     this.loginForm.setErrors({ auth: false });
  //   });
  // }

}
