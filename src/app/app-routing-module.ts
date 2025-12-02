import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { UnidadList } from './components/unidades/unidad-list/unidad-list';
import { UnidadAddEdit } from './components/unidades/unidad-add-edit/unidad-add-edit';
import { OrdenSubscripcionList } from './components/ordenSubscripciones/orden-subscripcion-list/orden-subscripcion-list';
import { OrdenSubscripcionAddEdit } from './components/ordenSubscripciones/orden-subscripcion-add-edit/orden-subscripcion-add-edit';
import { SubscripcionList } from './components/subscripciones/subscripcion-list/subscripcion-list';
import { SubscripcionAddEdit } from './components/subscripciones/subscripcion-add-edit/subscripcion-add-edit';
import { OportunidadList } from './components/oportunidades/oportunidad-list/oportunidad-list';
import { OportunidadAddEdit } from './components/oportunidades/oportunidad-add-edit/oportunidad-add-edit';
import { ClaseList } from './components/clases/clase-list/clase-list';
import { ClaseAddEdit } from './components/clases/clase-add-edit/clase-add-edit';
import { EvaluacionList } from './components/evaluaciones/evaluacion-list/evaluacion-list';
import { EvaluacionAddEdit } from './components/evaluaciones/evaluacion-add-edit/evaluacion-add-edit';
import { PreguntaList } from './components/preguntas/pregunta-list/pregunta-list';
import { PreguntaAddEdit } from './components/preguntas/pregunta-add-edit/pregunta-add-edit';
import { RespuestaList } from './components/respuestas/respuesta-list/respuesta-list';
import { RespuestaAddEdit } from './components/respuestas/respuesta-add-edit/respuesta-add-edit';
import { autorizarConsultaGuard } from './guards/autorizar-consulta-guard';
import { autorizarRegistroGuard } from './guards/autorizar-registro-guard';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [autorizarConsultaGuard] },
  { path: 'unidad-list', component: UnidadList, canActivate: [autorizarConsultaGuard] },
  { path: 'unidad-add', component: UnidadAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'unidad-edit/:id', component: UnidadAddEdit, canActivate: [autorizarRegistroGuard] },
  {
    path: 'orden-subscripcion-list',
    component: OrdenSubscripcionList,
    canActivate: [autorizarConsultaGuard],
  },
  {
    path: 'orden-subscripcion-add',
    component: OrdenSubscripcionAddEdit,
    canActivate: [autorizarRegistroGuard],
  },
  {
    path: 'orden-subscripcion-edit/:id',
    component: OrdenSubscripcionAddEdit,
    canActivate: [autorizarRegistroGuard],
  },
  { path: 'subscripcion-list', component: SubscripcionList, canActivate: [autorizarConsultaGuard] },
  { path: 'subscripcion-add', component: SubscripcionAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'subscripcion-edit/:id', component: SubscripcionAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'clase-list', component: ClaseList, canActivate: [autorizarConsultaGuard] },
  { path: 'clase-add', component: ClaseAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'clase-edit/:id', component: ClaseAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'oportunidad-list', component: OportunidadList, canActivate: [autorizarConsultaGuard] },
  { path: 'oportunidad-add', component: OportunidadAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'oportunidad-edit/:id', component: OportunidadAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'evaluacion-list', component: EvaluacionList, canActivate: [autorizarConsultaGuard] },
  { path: 'evaluacion-add', component: EvaluacionAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'evaluacion-edit/:id', component: EvaluacionAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'pregunta-list', component: PreguntaList, canActivate: [autorizarConsultaGuard] },
  { path: 'pregunta-add', component: PreguntaAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'pregunta-edit/:id', component: PreguntaAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'respuesta-list', component: RespuestaList, canActivate: [autorizarConsultaGuard] },
  { path: 'respuesta-add', component: RespuestaAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: 'respuesta-edit/:id', component: RespuestaAddEdit, canActivate: [autorizarRegistroGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
