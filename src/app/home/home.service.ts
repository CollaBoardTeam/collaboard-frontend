import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {

  baseUrl = "http://les16a.fe.up.pt/";
  getWhiteboardsPath = "public/wbs_by_user/";

  constructor(private http: Http) { }

  getWhiteboards(): Promise<any[]> {
    return this.http.get(this.baseUrl + this.getWhiteboardsPath + 1)
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
