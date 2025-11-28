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
import { Home } from './components/home/home';
import { UnidadAddEdit } from './components/unidades/unidad-add-edit/unidad-add-edit';
import { UnidadList } from './components/unidades/unidad-list/unidad-list';
import { ClaseAddEdit } from './components/clases/clase-add-edit/clase-add-edit';
import { ClaseList } from './components/clases/clase-list/clase-list';
import { EvaluacionAddEdit } from './components/evaluaciones/evaluacion-add-edit/evaluacion-add-edit';
import { EvaluacionList } from './components/evaluaciones/evaluacion-list/evaluacion-list';
import { SubscripcionAddEdit } from './components/subscripciones/subscripcion-add-edit/subscripcion-add-edit';
import { SubscripcionList } from './components/subscripciones/subscripcion-list/subscripcion-list';
import { OportunidadAddEdit } from './components/oportunidades/oportunidad-add-edit/oportunidad-add-edit';
import { OportunidadList } from './components/oportunidades/oportunidad-list/oportunidad-list';
import { OrdenSubscripcionAddEdit } from './components/ordenSubscripciones/orden-subscripcion-add-edit/orden-subscripcion-add-edit';
import { OrdenSubscripcionList } from './components/ordenSubscripciones/orden-subscripcion-list/orden-subscripcion-list';
import { PreguntaAddEdit } from './components/preguntas/pregunta-add-edit/pregunta-add-edit';
import { RespuestaAddEdit } from './components/respuestas/respuesta-add-edit/respuesta-add-edit';
import { RespuestaList } from './components/respuestas/respuesta-list/respuesta-list';
import { PreguntaList } from './components/preguntas/pregunta-list/pregunta-list';
import { Login } from './components/login/login';
import { DeleteConfirmation } from './components/confimations/delete-confirmation/delete-confirmation';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    App,
    UsuariosAddEdit,
    UsuariosList,
    ClienteAddEdit,
    ClienteList,
    Home,
    UnidadAddEdit,
    UnidadList,
    ClaseAddEdit,
    ClaseList,
    EvaluacionAddEdit,
    EvaluacionList,
    SubscripcionAddEdit,
    SubscripcionList,
    OportunidadAddEdit,
    OportunidadList,
    OrdenSubscripcionAddEdit,
    OrdenSubscripcionList,
    PreguntaAddEdit,
    RespuestaAddEdit,
    RespuestaList,
    PreguntaList,
    Login,
    DeleteConfirmation,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule
    

  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
