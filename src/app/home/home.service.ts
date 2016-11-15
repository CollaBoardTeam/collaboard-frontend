import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  constructor() { }

  getWhiteboards(): Promise<any[]> {
    var whiteboards = [];
    whiteboards[0] = { id: 1, name: "LES 2016 - Team A", owner: { name: "Marco Rodrigues", currentUser: true } };
    whiteboards[1] = { id: 2, name: "MESW", owner: { name: "Ana Paiva", currentUser: false } };
    return Promise.resolve(whiteboards);
  }

}
