import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Components } from './components/components';
import { UsuariosAddEdit } from './components/usuarios/usuarios-add-edit/usuarios-add-edit';
import { UsuariosList } from './components/usuarios/usuarios-list/usuarios-list';
import { ClienteAddEdit } from './components/cliente/cliente-add-edit/cliente-add-edit';
import { ClienteList } from './components/clientes/cliente-list/cliente-list';

@NgModule({
  declarations: [
    App,
    Components,
    UsuariosAddEdit,
    UsuariosList,
    ClienteAddEdit,
    ClienteList
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
