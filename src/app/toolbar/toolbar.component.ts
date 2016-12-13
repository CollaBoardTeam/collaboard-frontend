import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.user = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
