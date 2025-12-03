import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { evaluacion } from '../models/evaluacion-model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  ruta_servidor: string = environment.apiUrl;
  recurso: string = 'Evaluacion';

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.warn('No hay token en storage; la petición no llevará Authorization');
      return {};
    }
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // GET /Evaluacion
  listAll() {
    return this.http.get<evaluacion[]>(
      `${this.ruta_servidor}/${this.recurso}`,
      this.authHeaders()
    );
  }

  // GET /Evaluacion/{id}
  listById(idEvaluacion: number) {
    return this.http.get<evaluacion>(
      `${this.ruta_servidor}/${this.recurso}/${idEvaluacion}`,
      this.authHeaders()
    );
  }

  // POST /Evaluacion/insert
  new(evaluacion: evaluacion) {
    return this.http.post<evaluacion>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      evaluacion,
      this.authHeaders()
    );
  }

  // PUT /Evaluacion/update
  update(evaluacion: evaluacion) {
    return this.http.put<evaluacion>(
      `${this.ruta_servidor}/${this.recurso}/update`,
      evaluacion,
      this.authHeaders()
    );
  }

  // DELETE /Evaluacion/eliminar/{id}
  delete(idEvaluacion: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${idEvaluacion}`,
      this.authHeaders()
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
