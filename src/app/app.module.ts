import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterializeDirective} from "angular2-materialize";

import { AppComponent } from './app/app.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';

@NgModule({
  declarations: [
    MaterializeDirective,
    AppComponent,
    WhiteboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
