import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  credentials = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.credentials.email, this.credentials.password);    
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['./home']);
    }
  }
}
