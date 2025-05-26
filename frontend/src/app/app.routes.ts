import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home.component';
import { LoginComponent } from './shared/pages/login.component';
import { SociosLsComponent } from './socios/pages/socios-ls.component';
import { ActasLsComponent } from './documentos/pages/actas-ls.component';
import { ActividadesLsComponent } from './actividades/pages/actividades-ls.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'socios', component: SociosLsComponent },
  { path: 'actas', component: ActasLsComponent },
  { path: 'actividades', component: ActividadesLsComponent },
  { path: '**', redirectTo: '' },

];
