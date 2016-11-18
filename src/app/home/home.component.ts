import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  whiteboards = [];
  newWhiteboard = { name: '', parameters: [] };

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.getWhiteboards().then(whiteboards => {
      this.whiteboards = whiteboards['message'];
      console.log(this.whiteboards);
    });    
  }

  openCreateWhiteboardModal() {
    this.newWhiteboard = { name: '', parameters: [] };

    $("#createWhiteboardModal").modal('open');
    $('#createWhiteboardTabs').tabs('select_tab', 'tabStickyNote');
  }

  closeCreateWhiteboardModal() {
    $("#createWhiteboardModal").modal('close');
  }

  addParameter() {
    this.newWhiteboard.parameters.push({ value: "New Parameter" });
  }

  deleteParameter(index: number) {
    this.newWhiteboard.parameters.splice(index, 1);
  }

}
