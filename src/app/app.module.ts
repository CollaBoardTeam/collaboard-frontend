import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterializeDirective} from "angular2-materialize";

import { AppComponent } from './app/app.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { CollaboardRouting } from './app/app.routing';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    MaterializeDirective,
    AppComponent,
    WhiteboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollaboardRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
