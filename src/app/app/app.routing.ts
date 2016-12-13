import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../app/auth.guard.service';
import { NotAuthGuard } from '../app/not.auth.guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { WhiteboardComponent } from '../whiteboard/whiteboard.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'whiteboard/:id',
        component: WhiteboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

export const CollaboardRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);