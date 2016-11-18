import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WhiteboardService {

  baseUrl = "http://les16a.fe.up.pt/";
  getWhiteboardsPath = "public/get_wb_content/";

  constructor(private http: Http) { }

  getStickyNotes(id: number): Promise<any[]> {
    return this.http.get(this.baseUrl + this.getWhiteboardsPath + id)
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
