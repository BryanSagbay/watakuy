import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './service/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'inicio',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'eventos', component: EventosComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
    ],
  },
];
