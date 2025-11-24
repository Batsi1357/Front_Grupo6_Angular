import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UsuariosAddEdit } from './components/usuarios/usuarios-add-edit/usuarios-add-edit';
import { UsuariosList } from './components/usuarios/usuarios-list/usuarios-list';
import { ClienteAddEdit } from './components/clientes/cliente-add-edit/cliente-add-edit';
import { ClienteList } from './components/clientes/cliente-list/cliente-list';
import { RolAddEdit } from './components/roles/rol-add-edit/rol-add-edit';
import { RolList } from './components/roles/rol-list/rol-list';

@NgModule({
  declarations: [
    App,
    UsuariosAddEdit,
    UsuariosList,
    ClienteAddEdit,
    ClienteList,
    RolAddEdit,
    RolList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
