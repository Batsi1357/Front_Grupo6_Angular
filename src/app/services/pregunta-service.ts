import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pregunta } from '../models/pregunta-model';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  ruta_servidor: string = "http://localhost:8080";
  recurso: string = "Pregunta";

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

  // ----------- LISTAR TODAS -----------
  // GET /Pregunta
  listAll() {
    return this.http.get<pregunta[]>(
      `${this.ruta_servidor}/${this.recurso}`,
      this.authHeaders()
    );
  }

  // ----------- LISTAR POR ID -----------
  // GET /Pregunta/{id}
  getById(id: number) {
    return this.http.get<pregunta>(
      `${this.ruta_servidor}/${this.recurso}/${id}`,
      this.authHeaders()
    );
  }

  // ----------- INSERT -----------
  // POST /Pregunta/insert
  create(pregunta: pregunta) {
    return this.http.post<pregunta>(
      `${this.ruta_servidor}/${this.recurso}/insert`,
      pregunta,
      this.authHeaders()
    );
  }

  // ----------- UPDATE -----------
  // PUT /Pregunta/update/{id}
  update(pregunta: pregunta) {
    return this.http.put<pregunta>(
      `${this.ruta_servidor}/${this.recurso}/update/${pregunta.idPregunta}`,
      pregunta,
      this.authHeaders()
    );
  }

  // ----------- DELETE -----------
  // DELETE /Pregunta/eliminar/{id}
  delete(id: number) {
    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/eliminar/${id}`,
      this.authHeaders()
    );
  }
}
