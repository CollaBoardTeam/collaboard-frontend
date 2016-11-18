import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WhiteboardService {

  baseUrl = "http://les16a.fe.up.pt/";
  getWhiteboardsPath = "public/get_wb_content/";
  createStickyNotePath = "private/create-st/";

  constructor(private http: Http) { }

  getStickyNotes(id: number): Promise<any[]> {
    return this.http.get(this.baseUrl + this.getWhiteboardsPath + id)
      .toPromise()
      .then(response => response.json() as any[]);
  }

  createStickyNote(userID, content, position, wbGroupID): Promise<any[]> {
    var stickyNote = { 'userID': userID, 'content': content, 'position': position, 'wbGroupID': wbGroupID };

    return this.http.post(this.baseUrl + this.createStickyNotePath, stickyNote)
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
