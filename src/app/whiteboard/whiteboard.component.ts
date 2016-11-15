import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WhiteboardService } from './whiteboard.service';

@Component({
  selector: 'whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
  providers: [WhiteboardService]
})
export class WhiteboardComponent implements OnInit {

  stickyNotes = [];

  constructor(private route: ActivatedRoute, private whiteboardService: WhiteboardService) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.whiteboardService.getStickyNotes(+params['id']))
      .subscribe(stickyNotes => this.stickyNotes = stickyNotes);
  }

}
