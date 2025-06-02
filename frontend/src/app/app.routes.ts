import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home.component';
import { LoginComponent } from './shared/pages/login.component';
import { SociosLsComponent } from './socios/pages/socios-ls.component';
import { ActasLsComponent } from './documentos/pages/actas-ls.component';
import { ActividadesLsComponent } from './actividades/pages/actividades-ls.component';
import { SociosEdComponent } from './socios/pages/socios-ed.component';
import { ActividadesEdComponent } from './actividades/pages/actividades-ed.component';

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
      breadcrumb: [ {nombre: 'Inicio', ruta: 'app'}, {nombre: 'Novo Socio', ruta: 'socios'} ]
    }
  },
  {
    path: 'socios/ne/:id',
    component: SociosEdComponent,
    data: {
      title: 'Editar Socio',
      breadcrumb: [ {nombre: 'Inicio', ruta: 'app'}, {nombre: 'Editar Socio', ruta: 'socios'} ]
    }
  },
  {
    path: 'actas', component: ActasLsComponent
  },
  {
    path: 'actividades',
    component: ActividadesLsComponent,
    data: {
      title: 'Listado de Actividades',
      breadcrumb: [ {nombre: 'Inicio', ruta: 'app'}, {nombre: 'Listado de Actividades', ruta: 'actividades'} ]
    }
  },
  {
    path: 'actividades/ne',
    component: ActividadesEdComponent,
    data: {
      title: 'Nova Actividade',
      breadcrumb: [ {nombre: 'Inicio', ruta: 'app'}, {nombre: 'Nova Actividade', ruta: 'actividades'} ]
    }
  },
  {
    path: 'actividades/ne/:id',
    component: ActividadesEdComponent,
    data: {
      title: 'Editar Actividade',
      breadcrumb: [ {nombre: 'Inicio', ruta: 'app'}, {nombre: 'Editar Actividade', ruta: 'actividades'} ]
    }
  },
  { path: '**', redirectTo: '' },

];
