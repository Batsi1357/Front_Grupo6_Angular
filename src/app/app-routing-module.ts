import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { UnidadList } from './components/unidades/unidad-list/unidad-list';
import { UnidadAddEdit } from './components/unidades/unidad-add-edit/unidad-add-edit';

const routes: Routes = [
  {path:"" , component:Login},
  {path:"login", component:Login},
  {path:"home", component:Home},
  {path:"unidad-list", component:UnidadList},
  {path:"unidad-add", component:UnidadAddEdit},
  {path:"unidad-edit/:id", component:UnidadAddEdit},
  {path:"**", redirectTo:""}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
