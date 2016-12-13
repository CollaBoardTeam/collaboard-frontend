import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  credentials = { fullname: '', email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.credentials.fullname, this.credentials.email, this.credentials.password).then(response => {
      this.router.navigate(['./login']);
    });
  }
}
