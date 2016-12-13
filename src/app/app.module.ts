import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeDirective } from "angular2-materialize";

import { AuthGuard } from './app/auth.guard.service';
import { NotAuthGuard } from './app/not.auth.guard.service';
import { AuthService } from './app/auth.service';

import { AppComponent } from './app/app.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { CollaboardRouting } from './app/app.routing';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    MaterializeDirective,
    AppComponent,
    WhiteboardComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollaboardRouting
  ],
  providers: [AuthGuard, NotAuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
