import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { UnidadList } from './components/unidades/unidad-list/unidad-list';
import { UnidadAddEdit } from './components/unidades/unidad-add-edit/unidad-add-edit';
import { OrdenSubscripcionList } from './components/ordenSubscripciones/orden-subscripcion-list/orden-subscripcion-list';
import { OrdenSubscripcionAddEdit } from './components/ordenSubscripciones/orden-subscripcion-add-edit/orden-subscripcion-add-edit';

const routes: Routes = [
  {path:"" , component:Login},
  {path:"login", component:Login},
  {path:"home", component:Home},
  {path:"unidad-list", component:UnidadList},
  {path:"unidad-add", component:UnidadAddEdit},
  {path:"unidad-edit/:id", component:UnidadAddEdit},
  {path:"orden-subscripcion-list", component:OrdenSubscripcionList},
  {path:"orden-subscripcion-add", component:OrdenSubscripcionAddEdit},
  {path:"orden-subscripcion-edit/:id", component:OrdenSubscripcionAddEdit},
  {path:"**", redirectTo:""}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
