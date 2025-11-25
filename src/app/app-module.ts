import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UsuariosAddEdit } from './components/usuarios/usuarios-add-edit/usuarios-add-edit';
import { UsuariosList } from './components/usuarios/usuarios-list/usuarios-list';
import { ClienteAddEdit } from './components/clientes/cliente-add-edit/cliente-add-edit';
import { ClienteList } from './components/clientes/cliente-list/cliente-list';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from './clientes/login/login';
import { Home } from './components/home/home';

@NgModule({
  declarations: [
    App,
    UsuariosAddEdit,
    UsuariosList,
    ClienteAddEdit,
    ClienteList,
    Login,
    Home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
