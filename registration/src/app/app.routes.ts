import { Routes } from '@angular/router';

import { LoginComponent } from './components/login-component/login-component';
import { RegistrationComponent } from './components/registration/registration';

import { LayoutComponent } from './components/layout/layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TrashComponent } from './components/dashboard/notes/trash/trash';
import { ArchiveComponent } from './components/dashboard/notes/archive/archive';


export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },

  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [

      // default
      { path: '', redirectTo: 'notes', pathMatch: 'full' },

      // 
      { path: 'notes', component: DashboardComponent },
      { path: 'reminders', component: DashboardComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'trash', component: TrashComponent }

    ]
  },

  { path: '**', redirectTo: 'login' }
];