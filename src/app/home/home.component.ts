import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  whiteboards = [];

  constructor() {
    this.whiteboards[0] = { id: 1, name: "LES 2016 - Team A", owner: { name: "Marco Rodrigues", currentUser: true } };
    this.whiteboards[1] = { id: 2, name: "MESW", owner: { name: "Ana Paiva", currentUser: false } };
  }

  ngOnInit() {
  }

  openCreateWhiteboardModal() {
    $("#createWhiteboardModal").modal('open');
  }

  closeCreateWhiteboardModal() {
    $("#createWhiteboardModal").modal('close');
  }

}
