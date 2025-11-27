import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { evaluacion } from '../models/evaluacion-model';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
   ruta_servidor: string = 'http://localhost:8080';
  recurso: string = 'Evaluacion';

  constructor(private http: HttpClient) {}

  // GET /Evaluacion
  listAll() {
    return this.http.get<evaluacion[]>(
      `${this.ruta_servidor}/${this.recurso}`
    );
  }

  // GET /Evaluacion/{id}
  listById(idEvaluacion: number) {
    return this.http.get<evaluacion>(
      `${this.ruta_servidor}/${this.recurso}/${idEvaluacion}`
    );
  }

  // POST /Evaluacion/insert
  new(evaluacion: evaluacion) {
    return this.http.post<evaluacion>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      evaluacion
    );
  }

  // PUT /Evaluacion/update
  update(evaluacion: evaluacion) {
    return this.http.put<evaluacion>(
      `${this.ruta_servidor}/${this.recurso}/update`,
      evaluacion
    );
  }

  // DELETE /Evaluacion/eliminar/{id}
  delete(idEvaluacion: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${idEvaluacion}`
    );
  }

  // ---------- QUERYS ----------

  // GET /Evaluacion/buscar-duracion-max?duracionMax=...
  buscarPorDuracionMaxima(duracionMax: number) {
    const params = new HttpParams()
      .set('duracionMax', duracionMax.toString());

    return this.http.get<evaluacion[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-duracion-max`,
      { params }
    );
  }

  // GET /Evaluacion/buscar-fecha-inicio?fecha=YYYY-MM-DD
  buscarPorFechaInicio(fecha: string) {
    const params = new HttpParams()
      .set('fecha', fecha);  // ejemplo: '2025-11-30'

    return this.http.get<evaluacion[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-fecha-inicio`,
      { params }
    );
  }

  // GET /Evaluacion/buscar-titulo?titulo=...
  buscarPorTitulo(titulo: string) {
    const params = new HttpParams()
      .set('titulo', titulo);

    return this.http.get<evaluacion[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-titulo`,
      { params }
    );
  }

  // GET /Evaluacion/buscar-entre-fechas?inicio=...&fin=...
  buscarEntreFechas(inicio: string, fin: string) {
    const params = new HttpParams()
      .set('inicio', inicio)   // 'YYYY-MM-DD'
      .set('fin', fin);        // 'YYYY-MM-DD'

    return this.http.get<evaluacion[]>(
      `${this.ruta_servidor}/${this.recurso}/buscar-entre-fechas`,
      { params }
    );
  }
}
