/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WhiteboardService } from './whiteboard.service';

describe('Service: Whiteboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhiteboardService]
    });
  });

  it('should ...', inject([WhiteboardService], (service: WhiteboardService) => {
    expect(service).toBeTruthy();
  }));
});
