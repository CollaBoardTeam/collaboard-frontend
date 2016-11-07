import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { WhiteboardComponent } from '../whiteboard/whiteboard.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'whiteboard/:id',
        component: WhiteboardComponent
    }
];

export const CollaboardRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);