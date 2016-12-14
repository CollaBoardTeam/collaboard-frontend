import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../app/auth.service';
import { ToolbarService } from './toolbar.service';

declare var $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [ToolbarService]
})
export class ToolbarComponent implements OnInit {

  user;
  invitations = [];

  constructor(private router: Router, private authService: AuthService, private toolbarService: ToolbarService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadInvitations();
  }

  loadInvitations() {
    this.toolbarService.getInvitations().then(response => {
      this.invitations = response["message"];
    });
  }

  acceptInvitation(invid, wbid) {
    this.toolbarService.acceptInvitation(invid, wbid).then(response => {
      this.loadInvitations();
    });
  }

  rejectInvitation(invid) {
    this.toolbarService.declineInvitation(invid).then(response => {
      this.loadInvitations();
    });
  }

  logout() {
    this.user = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openInvitationsModal() {
    $("#invitationsModal").modal('open');
  }

  closeInvitationsModal() {
    $("#invitationsModal").modal('close');
    window.location.reload();
  }

}
