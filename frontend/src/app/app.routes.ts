import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home.component';
import { LoginComponent } from './shared/pages/login.component';
import { SociosLsComponent } from './socios/pages/socios-ls.component';
import { ActasLsComponent } from './documentos/pages/actas-ls.component';
import { ActividadesLsComponent } from './actividades/pages/actividades-ls.component';
import { SociosEdComponent } from './socios/pages/socios-ed.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'socios',
    component: SociosLsComponent,
    data: {
      title: 'Listado de Socios',
      breadcrumb: [ {nombre: 'Inicio', ruta: 'app'}, {nombre: 'Listado de Socios', ruta: 'socios'} ]
    }
  },
  {
    path: 'socios/ne',
    component: SociosEdComponent,
    data: {
      title: 'Novo Socio',
      breadcrumb: [ {nombre: 'Inicio', ruta: 'app'}, {nombre: 'Novo Socio', ruta: 'socios/ne'} ]
    }
  },
  { path: 'actas', component: ActasLsComponent },
  { path: 'actividades', component: ActividadesLsComponent },
  { path: '**', redirectTo: '' },

];
